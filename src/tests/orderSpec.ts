import Order,{order_type} from "../models/Order";
import app from "../server";

const order = new Order();


describe('Testing orders',()=>{
    it("testing order defenition",()=>{
        expect(order).toBeDefined();
    })
    it("create new order",async()=>{
        let test_order : order_type = {
            user_id : '1' ,
            product_id : '1',
            product_quantity : 1,
            status : "Active"
        } 
        const res = await order.createOrder(test_order);

        expect(res).toBe("Order is created ");
    })

})