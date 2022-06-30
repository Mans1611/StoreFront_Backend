import supertest from "supertest";
import User ,{user_type} from "../models/Users"
import app from "../server";

const user = new User();
const App = supertest(app);
describe("testing users routes",()=>{
   
    it("testing server",async ()=>{
        const res = await App.get('/');
        expect(res.status).toBe(200);
    })   
})