import Products,{product_type} from "../models/Products";
import supertest from "supertest";
import app from "../server";
const product = new Products();

const request = supertest(app);

describe("Testing products model ",()=>{
    it('testing defeinition of products',()=>{
        expect(product).toBeDefined();
    })

    it("Testing add new Product",async()=>{
        const newProduct = await product.create(
            {
                name:"rice",
                category:"food",
                price : 17.5
            }
        );
        expect(newProduct).toBe("done")
    })

    it("updating test",async()=>{
        const res = await request.delete('/products/deleteProduct/6');
        expect(res.status).toEqual(200);
    })
})

