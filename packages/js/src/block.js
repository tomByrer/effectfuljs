import * as Kit from "./kit"
import {Tag,symbol} from "./kit"
import * as assert from "assert"
import * as Prop from "./propagate"

/** 
  * saves result of operation with an effect 
  * (JS or monadic) into a temporal variable 
  */
export const letStmt = symbol("letStmt")
/** a block of code with at most 1 monadic effect */
export const frame = symbol("frame")
/** sequence of `frame`s */
export const chain = symbol("chain")
/** reference to `letStmt` */
export const bindPat = symbol("bindPat")
/** marks effectful expression, not requiring coercion */
export const effExpr = symbol("effExpr")
/** marks effectful block, not requiring coercion */
export const effBlock = symbol("effBlock")
/** a chain of applications to some library operation */
export const app = symbol("app")
/** marks an expression which shouldn't be bound */
export const pure = symbol("pure")
/** marks an expression to share in JS using some temporal variable */
export const sharedRef = symbol("sharedRef")
/** effectful operation */
export const op = symbol("op")


export const pureUndefId = Kit.sysId("pureUndef")
export const pureId = Kit.sysId("pure")
export const bindId = Kit.sysId("bind")
export const arrId = Kit.sysId("arr")
export const mapId = Kit.sysId("map")

/**
 * Replaces binary `app` nodes with its first component member function call 
 * with `name`, passing second component as a function to its argument
 */
export function interpretApp(s) {
  const sl = Kit.auto(s)
  const {contextBy,contextMethodOps,contextMethodOpsSpec} = sl.opts
  const {contextSym} = sl.first.value
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter) {
        if (i.type === app) {
          const lab = sl.label()
          yield sl.enter(i.pos,effExpr)
          yield sl.enter(Tag.expression,Tag.CallExpression)
          if (i.value.static !== false) {
            yield sl.tok(Tag.callee,Tag.Identifier,
                         {sym:i.value.sym})
            yield sl.enter(Tag.arguments,Tag.Array)
            yield* Kit.reposOne(walk(sl.one()), Tag.push)
          } else {
            yield sl.enter(Tag.callee,Tag.MemberExpression,{bind:true})
            yield* Kit.reposOne(walk(sl.one()),Tag.object)
            yield sl.tok(Tag.property,Tag.Identifier,{sym:i.value.sym})
            yield* sl.leave()
            yield sl.enter(Tag.arguments,Tag.Array)
          }
          const sub = sl.label()
          for(let j; (j = sl.curLev()) != null;) { 
            let pos
            if (j.pos === Tag.params) {
              yield sl.enter(Tag.push,Tag.ArrowFunctionExpression)
              yield* sl.one()
              pos = Tag.body
            } else {
              pos = Tag.push
            }
            yield* Kit.repos(walk(sl.one()),pos)
            yield* sub()
          }
          yield* lab()
          sl.close(i)
          continue
        }
      }
      yield i
    }
  }
  return walk(sl)
}
/** 
 * for each `frame` adds its index in `chain` and for each `chain` 
 * total number of frames 
 */
function* countEffSeqFramesImpl(s) {
  const stack = []
  let level = 0
  for(const i of s) {
    yield i
    if (i.enter) {
      const f = stack[stack.length-1]
      if (f != null && f.l === level)
        i.value.index = f.c++
      level++
      if (i.type === chain)
        stack.push({l:level,c:0})
    }
    if (i.leave) {
      level--
      if (i.type === chain) {
        const f = stack.pop()
        i.value.count = f.c
      }
    }
  }
}

/** eager `countEffSeqFramesImpl` */
const countEffSeqFrames = Kit.pipe(countEffSeqFramesImpl,Array.from)

/** removes useless pure frames */
export const cleanPureFrames = Kit.pipe(
  countEffSeqFramesImpl,
  //TODO: use matcher
  function* markPureFrame(s) {
    const sl = Kit.auto(s)
    for(const i of sl) {
    yield i
      if (i.enter && i.type === frame) {
        const j = sl.take()
        yield j
        if (j.type !== letStmt) {
          continue
        }
        const k = sl.curLev()
        i.value.pureFrame = k != null && k.type === pure
      }
      //TODO: check argument
    }
  },
  Array.from,
  function*(s) {
    const sl = Kit.auto(s)
    for(const i of sl) {
      if (i.type === frame && i.value.pureFrame && i.value.index > 0) {
        if (i.enter)
          Kit.skip(sl.sub())
      } else {
        yield i
      }
    }
  })

/** removes empty and single length chain tags */ 
export const cleanupEffSeq = Kit.pipe(
  countEffSeqFrames,
  function* cleanupEffSeq(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        if (i.enter && i.type === chain && i.value.count < 2) {
          yield sl.enter(i.pos,Kit.Subst)
          yield* walk()
          yield* sl.leave()
          sl.take()
          continue
        }
        yield i
      }
    }
    yield* walk()
  },
  Kit.completeSubst)

/** converts chains to JS expressions */
export function* interpretBinEffSeq(s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      switch(i.type) {
      case bindPat:
        yield Kit.setType(i,Tag.Identifier)
        break
      case chain:
        if (i.enter) {
          assert.equal(i.value.count,2)
          const patSym = sl.cur().value.sym
          const sym = bindId
          const lab = sl.label()
          const head = sl.enter(i.pos,app,{sym})
          yield head
          yield* walk(sl.one())
          yield sl.enter(Tag.params,Tag.Array)
          if (patSym != null)
            yield s.tok(Tag.push,Tag.Identifier,{sym:patSym})
          yield* sl.leave()
          if (!sl.cur().value.eff)
            head.sym = mapId
          yield* walk(sl.sub())
          yield* lab()
        }
        break
      default:
        yield i
      }
    }
  }
  yield* walk(sl)
}

/** corrects JS AST nodes types to match specification */
export const interpretCasts = Kit.pipe(
  function* cleanEffExpr(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        switch(i.type) {
        case effExpr:
          if (i.enter) {
            yield sl.enter(i.pos,Kit.Subst)
            const j = sl.curLev()
            if (j != null)
              j.value.result = true
            yield* walk()
            yield* sl.leave()
          }
          break
        case effBlock:
          if (i.enter) {
            yield sl.enter(i.pos,Tag.BlockStatement)
            yield sl.enter(Tag.body,Tag.Array)
            yield* walk()
            yield* sl.leave()
            yield* sl.leave()
          }
          break
        default: 
          yield i
        }
      }
    }
    yield* walk()
  },
  Kit.completeSubst,
  Kit.adjustFieldType
)

/** splits JS into frames with at most 1 effectful expression (the last one) */
export const splitEffBlock = Kit.pipe(
  function* splitEffBlock(s) {
    const sl = Kit.auto(s)
    function* block(i) {
      assert.ok(i.enter)
      const exit = sl.level-1
      const lab = sl.label()
      yield sl.peel(i)
      let r = sl.enter(Tag.push,frame)
      yield r
      for(const j of sl.sub()) {
        if (j.enter) {
          if (j.type === chain) {
            yield* block(j)
          } else {
            yield sl.peel(j)
            yield* walk()
            yield* sl.leave()
          }
          if (j.value.eff) {
            r.value.eff = true
            yield* sl.leave()
            yield r = sl.enter(Tag.push,frame)
          }
        } else {
          yield j
        }
      }
      yield* lab()
    }
    function* walk() {
      for(const i of sl.sub()) {
        if(i.enter && i.type === chain)
          yield* block(i)
        else
          yield i
      }
    }
    yield* walk()
  },
  //* removes empty frame, but keeps it if it is the only one in the chain
  function rmEmptyFrame(s) {
    s = Kit.auto(s)
    function* walk() {
      let first = true
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case frame:
            if (first) {
              first = false
            } else {
              if (s.cur().value === i.value) {
                s.take()
                continue
              }
            }
            break
          case chain:
            yield i
            yield* walk()
            continue
          }
        }
        yield i
      }
    }
    return walk()
  },
  Prop.recalcEff
)

/** removes `pure` tag if its content is in fact effectful */
export function* cleanPureEff(s) {
  s = Kit.auto(s)
  for(const i of s) {
    if (i.type === pure) {
      if (i.enter) {
        const j = s.curLev()
        if (j != null && j.value.eff) {
          yield s.peel(Kit.setPos(s.take(),i.pos))
          yield* s.sub()
          yield* s.leave()
          s.close(i)
          continue
        }
      }
    }
    yield i
  }
}

/** converts `pure` tags into JS expressions */
export function* interpretPure(s) {
  const sl = Kit.auto(s)
  const root = sl.first.value
  const ctxSym = root.contextSym
  function* walk() {
    for(const i of sl.sub()) {
      if (i.type === pure) {
        if (i.enter) {
          const lab = sl.label()
          yield sl.enter(i.pos,Tag.CallExpression,{result:true})
          yield sl.tok(Tag.callee, Tag.Identifier, {sym: pureId})
          yield sl.enter(Tag.arguments,Tag.Array)
          yield* Kit.reposOne(walk(),Tag.push)
          yield* lab()
        }
      } else
        yield i
    }
  }
  yield* walk()
}

/**
 * for frames ending with effectful let adds its reference to `effLet` field
 *
 *     type Value = Value & { effLet?: Value }
 * 
 * for `Block.frame`
 */
export function saveFrameLet(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  function walk(f) {
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case frame:
          if (i.value.eff)
            walk(i.value)
          break
        case letStmt:
          if (i.value.eff) {
            assert.ok(f)
            f.effLet = i.value
            f = null
          }
        }
      }
    }
  }
  walk()
  return sa
}

/** adds contextSym namespace to library symbols
 * (handling `contextMethodOps` and `contextMethodOpsSpec` options
 */
export function ctxMethods(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const {contextSym} = root
  const {contextMethodOps,contextMethodOpsSpec,scopeConstructor} = s.opts
  if (!contextSym || !contextMethodOps)
    return s
  return walk()
  function* walk() {
    for(const i of s) {
      let sym
      if (i.enter && i.type === Tag.Identifier
          && (sym = i.value.sym) && sym.lib
          && sym.name !== scopeConstructor
          && contextMethodOpsSpec[sym.name] !== false
         ) {
        yield s.enter(i.pos, Tag.MemberExpression)
        if (sym.ctxField) {
          yield s.enter(Tag.object,Tag.MemberExpression)
          yield s.tok(Tag.object,Tag.Identifier,{sym:contextSym})
          yield s.tok(Tag.property,Tag.Identifier,{node:{name:sym.ctxField}})
          yield* s.leave()
        } else {
          yield s.tok(Tag.object,Tag.Identifier,{sym:contextSym})
        }
        yield s.tok(Tag.property,Tag.Identifier,{node:{name:i.value.sym.name}})
        yield* s.leave()
        s.close(i)
        continue
      }
      yield i
    }
  }
}
