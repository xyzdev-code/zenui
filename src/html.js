import {$state} from "./state.js"
// @ts-check
/**
  * @param templateString {TemplateStringsArray}
  * @param values {unknown[]}
  */
function html(templateString, ...values){
  setInterval(()=>{console.log(values[0])}, 100)
  return templateString
}

