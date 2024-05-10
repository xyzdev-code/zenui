import { ViewBuilder, html } from "../src/view.js";
import { describe, test, expect } from "@jest/globals"
expect.extend({
    toMatchArray(received, expected){
        if(Array.isArray(received) && Array.isArray(expected)){
            for(let i=0; i<expected.length; i++){
                if(!Object.is(received[i],expected[i])){
                    return {
                        message: ()=>
                            `Expected: ${expected[i]}, received ${received[i]} //Object.is equality`,
                        pass: false
                    }
                }
            }
            return {
                message: ()=>
                    ``,
                pass: true
            }
        }else{
            return {
                message: ()=>
                    `Matcher error: received and expected values must be arrays.`,
                pass: false
            }
        }
    }
})
describe("ViewBuilder tests", ()=>{
    const myView = new ViewBuilder
    const myView2 = new ViewBuilder
    const {h1, h2} = html()
    test("ViewBuilder instantiation and default properties", ()=>{
        expect(myView).toHaveProperty("render")
        // @ts-expect-error: toMatchArray() does not have ts types.
        expect(myView.render()).toMatchArray([`<div data-component-id=${myView.id}>` , `</div>`])
        expect(myView.id).toBe(1)
        expect(myView2.id).toBe(2)
        expect(myView.tag).toBe("div")
    })
    test("html function", ()=>{
        expect(new h1).toBeInstanceOf(ViewBuilder)
        // @ts-expect-error
        expect((new h1).render()).toMatchArray([`<h1 data-component-id=4>`, `</h1>`])
        expect((new h1).tag).toBe("h1")
    })
})