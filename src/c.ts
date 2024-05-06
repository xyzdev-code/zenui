import { $state } from "./state.js";

class A{
    hello = $state(5)
    constructor(){
        this.hello.count
    }
}