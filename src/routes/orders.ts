import express,{query, Request,Response} from "express";
import tokenVerify from "../middleware/tokenVerify";
import Order from "../models/Order";
const orders = express.Router();
const order = new Order();

orders.get('/',async (req,res)=>{
    try{
        const result = await order.getAll();
        res.send(result)
    }catch(err){
        res.json({"msg":err});
    }

})

orders.get('/currentOrder/',tokenVerify,async (req:Request,res:Response)=>{
    if(!req.query.user_id || !req.query.order_id)
        res.status(401).send("please Provide user_id and order_id in the link as query")
    try{
        const result = await order.currentOrder(req);

        res.send(result)
    }catch(err){
        res.json({"msg":err});
    }
})

orders.post('/create/:user_id',tokenVerify,async(req:Request,res:Response)=>{
    const {status,product_quantity,product_id} = req.body;
    
    if(!status || !product_id || !product_quantity )
        return res.status(400).send("you have to provide all order requirements status,product_quantity and product_id in the body")
    const payload = JSON.parse(req.headers.payload as string)
    if(payload.user_id != req.params.user_id)
        return res.status(402).send('this token is not for this user');
        try{
        const result = await order.createOrder({...req.body,...req.params});
        res.send(result);
    }catch(err){
        res.json({"msg":err});
    }
    
})
orders.delete('/deleteOrder/:order_id',tokenVerify,async (req:Request,res:Response)=>{    
    const payload = JSON.parse(req.headers.payload as string);
    try{
        const result = await order.deleteOrder(req.params.order_id, payload.user_id);
        return res.status(200).send(result);
    }catch(err){
        res.json({"msg":err});
    }

})

export default orders;