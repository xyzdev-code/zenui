
/**
 * @typedef {import("./global.js").View} View
 * @typedef {import("./global.js").HTMLTags} HTMLTags
 */
globalThis.componentId = 0
const singleTagElements = ["base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]
export class ViewBuilder{
    /**
     * @type {CSSStyleSheet | null}
     */
    internalCss = null
    /**
     * @type {ARIAMixin | null}
     */
    internalAria = null
    constructor(){
        this.componentId = globalThis.componentId
        globalThis.componentId++
    }
    /**
     * @param {ARIAMixin} ariaProps
     */
    aria(ariaProps){
        this.internalAria = ariaProps
    }
    /**
     * @param {CSSStyleSheet} CSSStyleSheet 
     */
    css(CSSStyleSheet){
        this.internalCss = CSSStyleSheet
    }
    
    /**
     * @returns {View[]} 
     */
    render(){
        return [null]
    }
}
class ClickViewBuilder extends ViewBuilder{
    handler(){}
    /**
     * @param {()=>any} handler 
     */
    handleClick(handler){
        this.handler = handler
    }
    click(){
        document.querySelector(`[data-component=${this.componentId}]`)?.addEventListener("click", this.handler)
    }
}

class HTMLViewBuilder extends ViewBuilder{
    /**
     * @type {HTMLTags}
     * @public
     */
    tag = "div"
    /**
     * @param  {(ViewBuilder | String)[]} ViewBuilders 
     */
    constructor(...ViewBuilders){
        super()
        this.ViewBuilders = ViewBuilders
    }
    render(){
        /**
        * @type {View[]}
        */
        const result = []
        let single = false
        if(singleTagElements.includes(this.tag)){
            result.push(`</${this.tag}>`)
            single = true
        }else{
            result.push(`<${this.tag}>`)
        }
        for(const builder of this.ViewBuilders){
            result.push(builder)
        }
        if(!single){
            result.push(`</${this.tag}>`)
        }
        return result
    }
}
class h1 extends HTMLViewBuilder{
    /**
     * @type {HTMLTags}
     */
    tag = "h1"
    constructor(){
        super()
    }
}
console.log(new h1().render())
