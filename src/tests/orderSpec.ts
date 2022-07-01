import supertest from "supertest";

import app from '../server'

const App = supertest(app);

describe("testing orders route",()=>{
    it("testing orders endpoint",async()=>{
        const res = await App.get('/orders');
        expect(res.status).toBe(200);        
    })
    
})
