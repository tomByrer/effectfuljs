# JavaScript embedded effects compiler

This is  a JavaScript to JavaScript transpiler. It offers extending JavaScript
language with various effects by means of runtime libraries, without even using
compiler plugins.

There are such libraries for (not yet supporting the new interface):

 * Asynchronous programming SOON - [Old version](https://github.com/awto/mfjs-promise)
 * Reactive programming (with RxJS) - [Old version](https://github.com/awto/mfjs-rx)
 * Logical programming - SOON [Old version](https://github.com/awto/mfjs-logic)
 * Multi-prompt delimited continuations - SOON [Old version](https://github.com/awto/mfjs-cc)

Not yet implemented:
 * probabilistic programming
 * parallel and distributed programming
 * persistent continuations
 * adaptive computations

Theare are typically small, some of them are just tiny wrappers of well known
interfaces, such as Promises and Rx Observables.

The compiler converts ES8 to ES8 and doesn't need any syntax extensions. 
So it may be applied to results of other compilers targeting JS such as 
CoffeeScript, TypeScript, Babel etc.

It stratifies input JavaScript code into two levels, namely object and meta
level. Their separation may be either explicit or implicit. 

Generators syntax can be used for explicit level separation. This
way following code:

```javascript
function* () {
  console.log("x:",yield getX());
}
```

will be translated into:

```javascript
function() {
  return getX().mapply(function (b) { console.log("x:", b); });
}
```

Or with implicit mode input code may be even more succinct:

```javascript
function() {
  console.log("x:",getX());
}
```

The output will be the same.

There are more examples of input/output in the
[test folder](https://github.com/awto/effectfuljs/tree/master/test/samples).

The `mapply` function there is abstract. For example its concrete implementation
for promises is their `then` function. There is a dozen of such functions
required to be implemented in concrete effects implementation library.
There is a library with default implementations of most of them using small
basis. The interface builds on Monads interfaces hierarchy from Haskell
(Functor, Applicative, Alternative, Monad).

It is arguable if explicit or implicit levels separation is better. This likely
depend on what kind effect is used. The succinct and more readable code is good,
but if effects are heavy making them explicit may be better. So effectfuljs
compiler supports both options.

I will abuse term *pure* for some JS code or values. This doesn't
mean the code is really pure of course. This is original JavaScript and it
is absolutely not a problem to use the side effects already embedded
in JavaScript. Including IO, references, exceptions, etc. 

Besides two primary explicit and implicit modes, there are means to
treat some parts of the code selectively to be either effectful or pure.

## Usage

There are a few babel presets for different options, for example
[@effectful/es](https://github.com/awto/effectfuljs/tree/master/packages/es) for abstract two layer syntax

First install it:

```sh
$ npm install --save-dev @effectful/es
```

Next compile your sources with babel using presets from:

```json
{
  "passPerPreset": true,
  "presets": ["@effectful/es","env"]
}
```

Here `passPerPreset` is required because Effectful.js compiler doesn't use babel transformation framework. 
It is based on
[@effectful/transducers](https://github.com/awto/effectfuljs/tree/master/packages/transducers). 
You won't typically use it directly unless you develop own effects library.

## Known major limitations

 * ES6 supper just replaced with `Object.getPrototypeOf(...)` and `call`, 
   this is enough for most applications. If it is not, transpile classes with babel 
   before effectful pass. No plans to fix this for now. No plans to implement.
 * In parameter's threading mode closure captured variables are always handled by reference. 
   Compiler tries to handle only
   variables by value. All mutating operation like `Array::push` or object's 
   field setting are still visible in other control threads. Closure capturing variables
   semantically are nothing but object's field. So they are references now too.
   But there are short term plans to track even mutating updates soon.
 * setters/getters and constructors cannot be effectful now, may be changed in near future
   after effectful's object referrences are implemented
 * eval/Function construction from string doesn't work, no plans to implement it.
 * configurations with state handling don't support `arguments` object aliasing 
   (chainging its element - changes parameter value).
   This may be implemented in future.

## Background

There are quite a few JavaScript transpilers adding some concrete new effects
into JavaScript language. This tool embeds abstract side effects into language.
Any concrete effect is a runtime library implementing that abstract interface.

One of the examples is recent ES standard updates with generators and `async/await`.
It is a new concrete side effect embedded into language. Adding same coroutines
effects with effectful-js doesn't require standard, syntax change and new compilers.

Human readability for generated code aim is shared with
[kneden](https://github.com/marten-de-vries/kneden) transpiler, and turning
`async/await` into promises expressions. The same may be achieved using effectful-js
with a tiny adapter from promises interface into effectfuljs. There is one implemented
in [@effectful/es-inline-rt](https://github.com/awto/effectfuljs/tree/master/packages/es-inline-rt), 
so effectfuljs approach does require runtime library loading, while kneden team highlights no runtime
library dependency as an advantage. Though from it is easy to remove not used features from 
Effectful.js runtime. And it may be even inlined into target modules.
Also, effectfuljs is more complete than kneden(at the time of writing this). It at least
can handle `breaks/return/continue` from `try/catch/finally`.

There are other less known JS extensions may be implemented as library using effectfuljs
compiler. These are [webppl](https://github.com/probmods/webppl) for probabilistic
programming, [flapjax](http://www.flapjax-lang.org/) language for reactive
programming.

A few other JS libraries abstract generators interface to any monad, for example
[burrido](https://github.com/pelotom/burrido). It works pretty well if effects
don't require re-executing of some control paths several times. Which is the
case for reactive, logical programming and continuations. Here is a problem
description for rx monad
[with burrido](https://gist.github.com/awto/9f5337fcf205df335c92f93a859e2fdf)
and this is the same
[with effectfuljs](https://gist.github.com/awto/d71bc466884dc9a9a6a93026ce363d17).

There are a few other things not possible to implement with libraries such as burrido, 
for example [ApplicativeDo](
http://research.microsoft.com/en-us/um/people/simonpj/papers/list-comp/applicativedo.pdf),
single layer syntax, persistent control flow.

In other languages the most famous examples of similar tools are Haskell
do-notation and C# LINQ. They implement explicit separation of meta and
object levels. They have different syntaxes. In JS burrido does the same.
The effectful level expressions are generators expressions, with
interface adapted to arbitrary monad, while pure code parts use plain JS
syntax.

In single level syntax the layers separation is implicit, and both use the
same language. The first mention of this I know is embedding monads using delimited
control by Andrzej Filinski in
[Representing monad](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.43.8213&rep=rep1&type=pdf)
paper from 1994. There is a more recent implementation of the same idea for Java in
[quasar framework](http://docs.paralleluniverse.co/quasar/) described in
[this post](https://www.infoq.com/articles/Dont-graft-Monads-onto-Imperative-Languages).
Continuations based implementation doesn't allow detecting and automatically
generating Applicative combinators instead of Monadic ones, for more efficient
code (more details in [Applicative vs Monad interface](#applicative-vs-monad-interface)).

There are also concrete side effects compilers with single level syntax,
for example flapjax and webppl.

## LICENSE

Copyright © 2016-2017 Vitaliy Akimov

Distributed under the terms of The MIT License (MIT).

