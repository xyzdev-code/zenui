/**
 * @typedef {import('./global.js').HTMLTags} HTMLTags
 */
/**
 * @template {(Error | undefined)} [T=undefined]
 * @typedef {import('./global.js').View<T>} View
 */
/**
 * @template T
 * @typedef {import('./global.js').State<T>} State
 */

export class ViewBuilder{
    static id = 0; 
    /**
     * @readonly
     */
    id;
    /**
     * @type {HTMLTags}
     * @default "div"
     */
    tag = "div";
    views;
    /**
     * @param {...View} views 
     */
    constructor(...views){
        this.views = views
        this.id = ViewBuilder.id
        ViewBuilder.id++
    }
    /**
     * @returns {View[]}
     */
    render(){
        /**
         * @type {View[]}
         */
        const finalView = [`<${this.tag} data-component-id=${this.id}>`]
        for(const view of this.views){
            finalView.push(view)
        }
        finalView.push(`</${this.tag}>`)
        return finalView
    }
}
/**
 * @returns {Readonly<Record<HTMLTags, typeof ViewBuilder>>} 
 */
export function html(){
    // @ts-expect-error: type has not been implemented 
    return new Proxy({}, {
        /**
         * @param {HTMLTags} property
         * @returns {typeof ViewBuilder} 
         */
        get(_target, property, _receiver){
            return class extends ViewBuilder{
                tag = property 
            }
        }
    })
}

const {h1} = html()
const a = new h1
