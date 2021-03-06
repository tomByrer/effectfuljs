/** runtime for ES async/await */

import {iterator} from "./leanIterator"
import {iteratorM} from "./leanAsyncIterator"
import {forInIterator} from "./forInIterator"

/**
 * wraps function to make AsyncFunction object model 
 * compatible with ES standard
 */
export var asyncFunction

/** context constructor for a few configurations */
export var async

/** context type */
export var Async

var Ap

if (!process.env.EJS_INLINE
    || process.env.EJS_LEAN_METHOD_ITERATORS
    || !process.env.EJS_NO_ES_OBJECT_MODEL) {
  Async = function Async() {}
  Ap = Async.prototype
  async = function async() {
    return new Async()
  }
}

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  function AsyncFunction() {}
  function AsyncFunctionPrototype() {}
  AsyncFunctionPrototype.prototype = Async.prototype;
  AsyncFunction.prototype = AsyncFunctionPrototype;
  Ap.constructor = AsyncFunctionPrototype.constructor = AsyncFunction;
  AsyncFunctionPrototype[Symbol.toStringTag] =
    AsyncFunction.displayName = "AsyncFunction";
  asyncFunction = function asyncFunction(fun) {
    Object.setPrototypeOf(fun, AsyncFunctionPrototype);
    return fun
  }
}

if (!process.env.EJS_INLINE) {
  Ap.scope = function scope(step, handle) {
    try {
      this.$handle = handle
      this.$step = step
      return process.env.EJS_DEFUNCT ? this.$run() : this.$step()
    } catch(e) {
      return process.env.EJS_DEFUNCT
        ? (this.$step= this.$handle, this.$run(e))
        : this.$handle(e)
    }
  }
  
  Ap.chain = function chain(p, step, handle) {
    return Promise.resolve(p)
      .then(
        v => {
          this.$handle = handle
          this.$step = step
          try {
            return process.env.EJS_DEFUNCT ? this.$run(v) : this.$step(v)
          } catch(e) {
            return process.env.EJS_DEFUNCT
              ? (this.$step = this.$handle, this.$run(e))
              : this.$handle(e)
          }
        },
        e => process.env.EJS_DEFUNCT
          ? (this.$step = this.$handle, this.$run(e))
          : this.$handle(e))
  }
  
  Ap.jump = function jump(value, step, handle) {
    this.$handle = handle
    this.$step = step
    try {
      return process.env.EJS_DEFUNCT ? this.$run(value) : this.$step(value)
    } catch(e) {
      return process.env.EJS_DEFUNCT
        ? (this.$step = this.$handle, this.$run(e))
        : this.$handle(e)
    }
  }

  Ap.pure = function pure(v) {
    return Promise.resolve(v)
  }

  Ap.raise = function raise(ex) {
    return Promise.reject(ex)
  }
} else if (process.env.EJS_DEFUNCT) {
  function contNext(ctx) {
    return function(v) { return ctx.$run(v) }
  }
  function contErr(ctx) {
    return function(v) { return ctx.$step = ctx.$handle, ctx.$run(v) }
  }
  Ap.chain = function chain(p) {
    return Promise.resolve(p).then(contNext(this),contErr(this))
  }
}

if (process.env.EJS_LEAN_METHOD_ITERATORS) {
  Ap.iterator = iterator
  Ap.iteratorM = iteratorM
  Ap.forInIterator = forInIterator
}
