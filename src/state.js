/**
 * @template T
 * @typedef {import("./global.js").State<T>} State
 */
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
    if(this.callSize<2){
      this.tick()
    }else{
      this.callSize--
    }
  }
}
/** 
 * @template T
 */
export class __WeakRefSet{
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
  [Symbol.iterator](){
    return this.values[Symbol.iterator]()
  }
}
globalThis.scheduler = new Scheduler()
/** @type {(null | (()=>any))} */
globalThis.currEffect = null
globalThis.stateCount = 0

/** 
  * @template T 
  * @param {T} initial
  * @returns {State<T>}
  */
export function $state(initial){
  globalThis.stateCount++
  return {
    internalValue: initial,
    /** @type {__WeakRefSet<()=>any>} */
    dependencies: new __WeakRefSet(),
    get value() {
      if(globalThis.currEffect){
        this.dependencies.add(globalThis.currEffect) 
      }
      return this.internalValue
    },
    /** @param val {T} */
    set value(val){
      this.internalValue = val 
      let curr;
      for(const dependency of this.dependencies){
        curr = dependency.deref()
        if(curr){
          scheduler.addEffect(curr)
        }
      }
      if(globalThis.currEffect===null){
        scheduler.done()
      }
    },
    type: "$state",
    count: globalThis.stateCount,
    valueOf(){
      return this.value
    },
    toString(){
      return String(this.value)
    }
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
  const internalValue = /** @type {State<T>} */ ($state(null))
  $effect(()=>{
      internalValue.value = effect()
  })
  return internalValue
}
