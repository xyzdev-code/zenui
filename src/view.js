/**
 * @typedef {import('./global.js').HTMLTags} HTMLTags
 * @typedef {import('./global.js').View} View
 */
/**
 * @template T
 * @typedef {import('./global.js').State<T>} State
 */

export class ViewBuilder{
    /**
     * @type {HTMLTags}
     */
    tag = "div";
    /**
     * @returns {View}
     */
    render(){
        return `<${this.tag}></${this.tag}>`
    }
}