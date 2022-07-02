import Order,{order_type} from "../../models/Order";
import Products from "../../models/Products";
import User from "../../models/Users";
import app from "../../server";
import { Request,Response } from "express";

/*
some of models need to be in the same file in order to test 
them correctly without sync with the other models files
*/

const order = new Order();
const user = new User();
const product = new Products();
describe('Testing orders',()=>{
    it("testing order defenition",()=>{
        expect(order).toBeDefined();
    })

    it("testing index",async()=>{
        const products_test = await product.index();
        expect(products_test).toBeDefined();
    })

    it("testing getting orders",async()=>{
        const orders = await order.getAll();
        expect(orders).toEqual([]);
    })
    
    it('testing creating new user ',async ()=>{
        const newUser = await user.create({
            firstname:"mansour",
            lastname:"Ali",
            password: "123123"
        })
        expect(newUser).toEqual('user is created');
    })

    it("Testing add new Product",async()=>{
        const newProduct = await product.create(
            {
                name:"order",
                category:"model",
                price : 163.12
            }
        );
        expect(newProduct).toBe("done")
    })
    it("testing create order",async ()=>{
        let test_order:order_type = {
            user_id:"1",
            product_id : "2", 
            product_quantity : "4",
            "status": "Active",
            order_id:"1"
            
        } 
        const order_res =  await order.createOrder(test_order);
        expect(order_res).toBe("Order is created");
    });
    
    it("deleting order test", async()=>{
        const delete_order_test = await order.deleteOrder("1","1");
        expect(delete_order_test).toBeDefined();
    })
    it("testing current order",async()=>{
        const req = {
            params:{
                id : 1,
            }
        }
        const current_order = await order.currentOrder((req as unknown)as Request)
        expect(current_order).toBe(' error in returnning current orders');
        // as i provide no token in the the header as well as no middleware beween them it just a model so it will catch that error.
    })
    it("deleting a product",async ()=>{
        const delete_res = await product.deleteProduct("2"); 
        expect(delete_res).toBe("The product is deleted");
    })
})