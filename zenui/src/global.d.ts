import {ViewBuilder} from "./view.js";
type HTMLTags = keyof HTMLElementTagNameMap
type View = ViewBuilder | null | String
type State<T> = {
    value: T,
    type: String,
    count: Number
} 
