import {ViewBuilder} from "./view.js";
import {WeakRefSet} from './state.js'
type HTMLTags = keyof HTMLElementTagNameMap
type View = ViewBuilder | null | string
type State<T> = {
    value: T,
    type: "$state",
    count: number,
    dependencies: WeakRefSet<()=>any>,
    internalValue:T,
    valueOf: ()=>T,
    toString: ()=>string
} 
