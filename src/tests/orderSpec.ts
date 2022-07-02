import supertest from "supertest";

import app from '../server'

const App = supertest(app);

describe("testing orders route",()=>{
    it("testing first endpoint",async()=>{
        const res = await App.get('/orders');
        expect(res.status).toBe(200);        
    })
    // testing current order
    it("testing ocurrent order",async()=>{
        const res = await App.get('/orders/currentOrder/?user_id=1');
        expect(res.text).toEqual("provide a token");
                
    })
    // testing creating order
    it("testing creating endpoint",async()=>{
        const res = await App.post('/orders/create/1');
        expect(res.text).toEqual("provide a token");      
    })

    it("testing deleting end point",async()=>{
        const res = await App.delete('/orders/deleteOrder/18');
        expect(res.status).toBe(400);        
    })
    
    

    
})
