import {describe, expect, test} from "@jest/globals"
import {$state, $effect, $computed} from "./../src/state.js"
describe("$state tests", ()=>{
  const val = $state(10)
  test("State has a value property", ()=>{
    expect(val).toHaveProperty('value', 10) 
  }) 
  test("State can be changed", ()=>{
    val.value = 11
    expect(val.value).toBe(11)
  })
})
describe("$computed tests", ()=>{
  const val = $state(10)
  let ran = 0
  const val2 = $computed(()=>val.value * 2)
  const val3 = $computed(()=>val.value * 3)
  const val4 = $computed(()=>{
    ran++
    return val2.value + val3.value
  })
  test("Computed values are correct and have a value property", ()=>{ 
    expect(val2).toHaveProperty('value', 20)
    expect(val3).toHaveProperty('value', 30)
    expect(val4).toHaveProperty('value', 50)
  })
  test("Computed values mutate", ()=>{
    val.value += 10
    expect(val2.value).toBe(40)
    expect(val3.value).toBe(60)
  })
  test("Computed values only run once when values mutate and can have multiple dependencies", ()=>{
    expect(ran).toBe(2)
  })
})
debugger
describe("$effect tests", ()=>{
  const a = $state(0)
  const b = $state(1)
  const c = $state(2)
  let ran = 0
  let ran2 = 0
  $effect(()=>{
    a.value
    ran++
  })
  $effect(()=>{
    b.value
    c.value
    ran2++
  })
  a.value++
  b.value++
  c.value++
  test("Effects should rerun", ()=>{
    expect(ran).toBe(2)
  })
  test("Effects can have multiple dependencies", ()=>{
    expect(ran2).toBe(3)
  })
})
