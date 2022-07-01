import supertest from "supertest";
import app from "../server";
const App = supertest(app);


describe("testing the users route ",()=>{
    it("testing users route",async()=>{
        const user_response = await  App.get("/users/");
        expect(user_response.text).toEqual("this is users route")
    })
})