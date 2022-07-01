import express,{Request,Response} from "express";
import tokenVerify from "../middleware/tokenVerify";
import Order from "../models/Order";
import users from "./users";
const orders = express.Router();
const order = new Order();

orders.get('/',async (req,res)=>{
    const result = await order.getAll();
    res.send(result)

})

orders.get('/currentOrder/:user_id/:order_id',tokenVerify,async (req:Request,res:Response)=>{
    const result = await order.currentOrder(req);
    res.send(result)
})

orders.post('/create/:user_id',tokenVerify,async(req:Request,res:Response)=>{
    const {status,product_quantity,product_id} = req.body;
    if(!status || !product_id || !product_quantity )
        return res.status(400).send("you have to provide all order requirements status,product_quantity and product_id in the body")
    const payload = JSON.parse(req.headers.payload as string)
    if(payload.user_id != req.params.user_id)
        return res.status(402).send('this token is not for this user');
    const result = await order.createOrder({...req.body,...req.params});
    res.send(result);
    
})
orders.delete('/deleteOrder/:order_id',tokenVerify,async (req:Request,res:Response)=>{    
    const payload = JSON.parse(req.headers.payload as string);
    const result = await order.deleteOrder(req.params.order_id, payload.user_id);
    return res.status(200).send(result);

})

export default orders;