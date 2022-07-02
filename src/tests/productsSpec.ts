import supertest from "supertest";
import app from "../server";
const App = supertest(app);

describe("testing product end point",()=>{
    it("testing main root of products",async()=>{
        const status = await  App.get('/products/');
        expect(status.text).toBe("Products Section");
    })
    it("testing sending request without a token",async()=>{
        const res = await App.post('/products/create/');
        expect(res.text).toEqual("provide a token"); // as it just a requset 
    })
    it("testing index of product",async()=>{
        const res = await App.get('/products/index')
        expect(res.status).toBe(400);
    })
    it("testing show spec product",async()=>{
        const res = await App.get('/products/show/1')
        expect(res.text).toBe("provide a token");
    })
    it("testing category endpoint",async()=>{
        const res = await App.get('/products/category/games')
        expect(res.text).toBe("this category is not found");
    })
    it("testing popularProducts",async()=>{
        const res = await App.get('/products/popularProducts')
        expect(res.status).toEqual(200);
    })
    it("testing updating product",async()=>{
        const res = await App.put('/products/update/1')
        expect(res.status).toEqual(400);
    })
    it("testing deleting product",async()=>{
        const res = await App.delete('/products/deleteProduct/1')
        expect(res.text).toEqual(" this product is not exist");
    })
    

})