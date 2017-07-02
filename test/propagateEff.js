import * as R from "ramda"
import * as Kit from "../src/kit/core"
import {prepareScopes,consumeScope} from "../src/transform"
import {Tag,produce,consume} from "estransducers"
import generate from "babel-generator"
import {parse} from "babylon"
import {equal,print,transformExpr} from "./kit/core"
import * as Debug from "../src/debug"
import * as Dump from "../src/dump"
import * as Trace from "estransducers/trace"
import * as Block from "../src/block"
import * as Ctrl from "../src/control"

const run = transformExpr(
    R.pipe(
      Ctrl.removeLabeldStatement,
      Debug.mark,
      consumeScope
    ))

describe('propagate effect for `for-of`', function() {
  context('with effect in body', function() {
    it('should be effectful 1', function() {
      equal(
        run(`function() {
          for(const i of s) {
            eff(1);
          }
        }`),
        print(`function () /*BS|E*/{
          /*FOS|E*/for (const /*I|+*/i of /*I|-*/s) /*BS|E*/{
            /*ES|e*/ /*CE|B*/ /*I|-*/eff(1);
          }
        }`))
    })
  })
  context('with effect in `for` init', function() {
    context('with variable declarations', function() {
      it('should have shallow effect 1',function() {
        equal(
          run(`function() {
            for(const i = init(1);t1;t2) {
              something;
            }
          }`),
          print(`function () /*BS|E*/{
            /*FS|e*/for ( /*VD|E*/const /*VD|E*/ /*I|+*/i = /*CE|B*/ /*I|-*/init(1);
              /*I|-*/t1; /*I|-*/t2) {
              /*I|-*/something;
            }
          }`))
      })
    })
  }),
  context('with no effects in body', function() {
    context('with `break`', function() {
      it('should not have effect 1',function() {
           equal(
             run(`function() {
               eff(1)
               for(var i of e) {
                 2+2;
                 if (a)
                   break
               }
             }`),
             print(`function () /*BS|E*/{
               /*ES|e*/ /*CE|B*/ /*I|-*/eff(1);
               
               for (var /*I|+*/i of /*I|-*/e) {
                 2 + 2;
                 if ( /*I|-*/a) break;
               }
             }`))
      })
    })
    context('with `continue`', function() {
      it('should not have effect 2',function() {
           equal(
             run(`function() {
               eff(1)
               for(var i of e) {
                 2+2;
                 if (a)
                   continue
               }
             }`),
             print(`function () /*BS|E*/{
               /*ES|e*/ /*CE|B*/ /*I|-*/eff(1);
               for (var /*I|+*/i of /*I|-*/e) {
                 2 + 2;
                 if ( /*I|-*/a) continue;
               }
             }`))
         })
    })
    context('with `break` to labels', function() {
      it ('should be effectful 2', function() {
        equal(
          run(`function() {
            lab: lab2: lab3: {
              eff(1)
              if (a)
                break lab
            }
          }`),
          print(`function () /*BS|E*/{
            lab: lab2: lab3: /*BS|E*/{
              /*ES|e*/ /*CE|B*/ /*I|-*/eff(1);
              /*IS|E*/if ( /*I|-*/a) /*BS|E*/break lab;
            }
          }`))
      })
    })
    context('with `break` to effectful block', function() {
      it('should be effecful 3', function() {
        equal(
          run(`function() {
            lab: {
              eff(1)
              for(var i of e) {
                2+2;
                if (a)
                  break lab
              }
            }
          }`),
          print(`function () /*BS|E*/{
            lab: /*BS|E*/{
              /*ES|e*/ /*CE|B*/ /*I|-*/eff(1);
              
              /*FOS|E*/for (var /*I|+*/i of /*I|-*/e) /*BS|E*/{
                2 + 2;
                /*IS|E*/if ( /*I|-*/a) /*BS|E*/break lab;
              }
            }
          }`))
      })
    })
    context('with `continue` to effectful block', function() {
      it('should be effecful 4',
         function() {
           equal(
             run(`function() {
               lab: for(;;) {
                 eff(1)
                 for(var i of e) {
                   2+2;
                   if (a)
                     continue lab
                 }
               }
             }`),
             print(`function () /*BS|E*/{
               lab: /*FS|E*/for (;;) /*BS|E*/{
                 /*ES|e*/ /*CE|B*/ /*I|-*/eff(1);
                 
                 /*FOS|E*/for (var /*I|+*/i of /*I|-*/e) /*BS|E*/{
                   2 + 2;
                   /*IS|E*/if ( /*I|-*/a) /*CS|E*/continue lab;
                 }
               }
             }`))
         })
    })
    context('with `return` in effectful function', function() {
      it('should be effecful 5',
         function() {
           equal(
             run(`function() {
               eff(1)
               for(var i of e) {
                 2+2;
                 if (a)
                   return
               }
             }`),
             print(`function () /*BS|E*/{
               /*ES|e*/ /*CE|B*/ /*I|-*/eff(1);
               
               /*FOS|E*/for (var /*I|+*/i of /*I|-*/e) /*BS|E*/{
                 2 + 2;
                 /*IS|E*/if ( /*I|-*/a) /*RS|E*/return;
               }
             }`))
         })
    })
    context('with complex control deps', function() {
      it('should assign effects appropriately', function() {
        equal(
          run(`function() {
            l1: for(var i of e) {
              2+2;
              l2: for(var j of f) {
                3+3
                for(var k of j)  {
                  4+4
                  if (a)
                    break
                }
                for(var l of k) {
                  if (b)
                    break l2
                }
                if (c)
                  break l1
              }
              eff(z)
            }
          }`),
          print(`function () /*BS|E*/{
            l1: /*FOS|E*/for (var /*I|+*/i of /*I|-*/e) /*BS|E*/{
              2 + 2;
              
              l2: /*FOS|E*/for (var /*I|+*/j of /*I|-*/f) /*BS|E*/{
                3 + 3;
                
                for (var /*I|+*/k of /*I|-*/j) {
                  4 + 4;
                  if ( /*I|-*/a) break;
                }
                
                /*FOS|E*/for (var /*I|+*/l of /*I|-*/k) /*BS|E*/{
                  /*IS|E*/if ( /*I|-*/b) /*BS|E*/break l2;
                }
                
                /*IS|E*/if ( /*I|-*/c) /*BS|E*/break l1;
              }
              
              /*ES|e*/ /*CE|B*/ /*I|-*/eff( /*I|-*/z);
            }
          }`))
      })
    })
    context('with effect on the right', function() {
      it('should be effectful 6',
         function() {
           equal(
             run(`function() {
               for(var i of eff(1)) {
                 2+2;
               }
             }`),
             print(function () /*BS|E*/{
               /*FOS|e*/for (var /*I|+*/i of /*CE|B*/ /*I|-*/eff(1)) {
                 2 + 2;
               }
             }))
         })
    })
  })
})
