import {$state} from "./state.js"
/**
  * @param templateString {TemplateStringsArray}
  * @param values {any[]}
  */
function html(templateString, ...values){
  let strPointer = 0
  /**
   * @type {String[]}
   */
  const finalArr = [];
  for(const value of values){
    finalArr.push(templateString[strPointer])
    if(value.type==="$state"){
      finalArr.push(`<div data-z-state="${value.count}">${value.value}</div>`)
    }else if(typeof value === "function"){
      const lastChar = templateString[strPointer].length - 1
      for(let char = lastChar; char < 0; char--){
        
      }
    }
    strPointer++
  }
  return finalArr.join('')
}
const a = $state(2)
console.log(html`Hello ${a}`)