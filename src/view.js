import { $state } from "./state.js"

globalThis.componentId = 0
export class ViewBuilder{
    /**
     * @param {import("./global.js").View} view 
     */
    constructor(view){
        this.componentId = globalThis.componentId
        globalThis.componentId++ 
        this.view = view
        this.component = document.createElement("div")
        this.component.attachShadow({mode: "open"})  
    }
    /**
     * @param {ARIAMixin} ariaString
     */
    aria(ariaString){

    }
    /**
     * @param {CSSStyleSheet} CSSStyleSheet 
     */
    css(CSSStyleSheet){
        
    }
    /**
     * @returns {import("./global.js").View} 
     */
    render(){
        return this.view
    }
}
