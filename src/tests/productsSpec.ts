import supertest from "supertest";
import app from "../server";
const App = supertest(app);

describe("testing product end point",()=>{
    it("testing status of root products",async()=>{
        const status = await  App.get('/products/');
        expect(status.status).toBe(200);
    })
    it("testing sending request without a token",async()=>{
        const res = await App.post('/products/create/',(req,res)=>{
        });

        expect(res.text).toEqual("provide a token"); // as it just a requset 
    })

})