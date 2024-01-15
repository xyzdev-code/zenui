class Scheduler{
  /** @type {Set<()=>any>} */
  effects = new Set()
  callSize = 0
  tick(){
    for(const effect of this.effects){
      effect()
    }
    this.callSize = this.effects.size
    this.effects.clear()
  }
  /** @param {()=>any} effect*/
  addEffect(effect){
    this.effects.add(effect)
  }
  done(){
    if(this.callSize===0 || this.callSize===1){
      this.tick()
    }else{
      this.callSize--
    }
  }
}
/** 
 * @template T
 */
class WeakRefSet{
  /** @type {Array<WeakRef<T & WeakKey>>} */
  values = []
  /** @param {T & WeakKey} val*/
  add(val){
    for(const value of this.values){
      if(value.deref()===val)
        return
    }
    this.values.push(new WeakRef(val))
  }
  clear(){
    this.values = []
  }
}
globalThis.scheduler = new Scheduler()
/** @type {(null | (()=>any))} */
globalThis.currEffect = null
globalThis.$stateSymbol = Symbol("$state")
globalThis.stateCount = 0
/** 
  * @template T
  * @param {T} initial
  */
export function $state(initial){
  let internalValue = initial
  /** @type {WeakRefSet<()=>any>} */
  const dependencies = new WeakRefSet()
  globalThis.stateCount++
    return {
    get value() {
      if(globalThis.currEffect){
        dependencies.add(globalThis.currEffect) 
      }
      return internalValue
    },
    /** @param val {T} */
    set value(val){
      internalValue = val 
      let curr;
      for(const dependency of dependencies.values){
        curr = dependency.deref()
        if(curr){
          scheduler.addEffect(curr)
        }
      }
      if(globalThis.currEffect===null){
        scheduler.done()
      }
    },
    type: globalThis.$stateSymbol,
    count: globalThis.stateCount,
    toString: function(){return `<div data-z-state="${this.count}">${this.value}</div>`}
  }
}

/**
  * @template T 
  * @param {()=>T} effect
  */
export function $effect(effect){
  function internalEffect(){
    globalThis.currEffect = internalEffect
    effect()
    globalThis.currEffect = null
  }
  internalEffect()
}
/**
 * @template T 
 * @param {()=>T} effect 
 */
export function $computed(effect){
  /** @type {ReturnType<typeof $state<T>>} */
  // @ts-ignore
  const internalValue = $state(null)
  $effect(()=>{
      internalValue.value = effect()
  })
  return internalValue
}
