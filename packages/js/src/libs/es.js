import * as Policy from "../policy"
import * as Kit from "../kit"

export default function* generatorsInit(opts) {
  const ops = {
    YieldExpression: true,
    AwaitExpression: true
  }
  return Kit.pipe(
    Policy.setFuncOpts({generator:false,
                        async:false,
                        coerce:false,
                        transform:null
                       }),
    Policy.setFuncOpts(Object.assign(
      {generator:true,
       async:false,
       transform:true,
       bindName:"yldStar",
       scopePrefix:true,
       scopeConstructor:"generator",
       static:true,
       coerce:false,
       combineOps:true,
       ops,
       scopePostfix:true,
       pureForOf:true,
       keepErrorCont:true,
       storeErrorCont:true,
       keepResultCont:true,
       storeResultCont:true,
       wrapFunction: "generatorFunction"
      },opts.all,opts.generators)),
    Policy.setFuncOpts(Object.assign(
      {generator:false,
       async:true,
       static:true,
       transform:true,
       bindName:"chain",
       scopePrefix:true,
       scopeConstructor:"async",
       static:true,
       coerce:false,
       combineOps:true,
       ops,
       scopePostfix:false,
       pureForOf:true,
       wrapFunction: "asyncFunction"
      },opts.all,opts.async)),
    Policy.setFuncOpts(Object.assign(
      {generator:true,
       async:true,
       static:true,
       transform:true,
       bindName:"chain",
       scopePrefix:true,
       scopeConstructor:"asyncGenerator",
       static:true,
       coerce:false,
       combineOps:true,
       ops,
       scopePostfix:true,
       pureForOf:true,
       storeErrorCont:true,
       keepErrorCont:true,
       storeResultCont:true,
       keepResultCont:true,
       wrapFunction: "asyncGeneratorFunction"
      },opts.all,opts.asyncGenerators)),
    Policy.configDiffPass)
}