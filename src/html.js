import {$state} from "./state.js"
/**
  * @param templateString {TemplateStringsArray}
  * @param values {any[]}
  */
function html(templateString, ...values){
  for(const value of values){
    if(value?.type === globalThis.$stateSymbol){
      console.log(value)
    }
  } 
  return templateString 
}
const a = $state(10)
console.log(html`hello ${a}`)
