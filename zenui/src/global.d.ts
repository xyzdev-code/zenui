import { ViewBuilder } from "./view.js";
type HTMLTags = keyof HTMLElementTagNameMap
type View = ViewBuilder | null | String

