import supertest from "supertest";
import app from "../server";
const App = supertest(app);


describe("testing the users route ",()=>{
    it("testing users route",async()=>{
        const user_response = await  App.get("/users/");
        expect(user_response.text).toEqual("this is users route")
    })

    it("testing users index",async()=>{
        const user_response = await  App.get("/users/index");
        expect(user_response.text).toEqual("provide a token");
    })

    it("testing users show",async()=>{
        const user_response = await  App.get("/users/show/1");
        expect(user_response.status).toEqual(400);
    })

    it("testing users complete order",async()=>{
        const user_response = await  App.get("/users/completeOrders");
        expect(user_response.status).toEqual(404)
    })
    it("testing users creat",async()=>{
        const user_response = await  App.post("/users/create");
        expect(user_response.text).toEqual("the body is incorrect you  must provide firstname & lastname")
    })

    it("testing users update",async()=>{
        const user_response = await  App.put("/users/update/1");
        expect(user_response.text).toEqual("provide a token")
    })

    it("testing users delete",async()=>{
        const user_response = await  App.delete("/users/delete/1");
        expect(user_response.status).toEqual(400)
    })


})