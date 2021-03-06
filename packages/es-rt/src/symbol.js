/**
 * exports Symbols to get lean iterators from containers at runtime
 * 
 * if option LEAN_ITERATOR_SYMBOL_GLOBAL is set it will use global 
 * symbols, so no 2 implementation can exist in a single process
 */

export var iterator = process.env.EJS_LOCAL_SYMBOLS
  ? Symbol("Effectful.iterator")
  : Symbol.for("Effectful.iterator")

export var asyncIterator = process.env.EJS_LOCAL_SYMBOLS
  ? Symbol("Effectful.asyncIterator")
  : Symbol.for("Effectful.asyncIterator")

if (!process.env.EJS_NO_ES_ITERATORS && !Symbol.asyncIterator)
  Symbol.asyncIterator = Symbol.for("Symbol.asyncIterator")

if (!process.env.EJS_LOCAL_SYMBOLS) {
  Symbol.effectfulIterator = iterator
  Symbol.effectfulAsyncIterator = asyncIterator
}
