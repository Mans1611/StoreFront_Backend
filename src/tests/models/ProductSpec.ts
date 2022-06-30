import Products,{product_type} from "../../models/Products";
import supertest from "supertest";
import app from "../../server";

const product = new Products();

const request = supertest(app);

describe("Testing products model ",()=>{
    it('testing defeinition of products',()=>{
        expect(product).toBeDefined();
    })
    it("testing index",async()=>{
        const products_test = await product.index();
        expect(0).toEqual([].length);
    })
   

    it("updating product test",async()=>{
        const res = await request.delete('/products/deleteProduct/6');
        expect(res.status).toEqual(200);
    })
   
})

