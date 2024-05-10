import {ViewBuilder} from "./view.js";
import {__WeakRefSet} from './state.js'
type HTMLTags = keyof HTMLElementTagNameMap
type View<E extends (Error | undefined)> = ViewBuilder | null | string | E
type State<T> = {
    value: T,
    type: "$state",
    count: number,
    dependencies: __WeakRefSet<()=>any>,
    internalValue:T,
    valueOf: ()=>T,
    toString: ()=>string
} 
