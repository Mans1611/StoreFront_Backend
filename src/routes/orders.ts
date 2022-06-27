import express from "express";
import tokenVerify from "../middleware/tokenVerify";
import Order from "../models/Order";
const orders = express.Router();
const order = new Order();

orders.get('/',async (req,res)=>{
    const result = await order.getAll();
    res.send(result)
})

orders.post('/currentOrder/:user_id',tokenVerify,async(req:express.Request,res:express.Response)=>{
    const result = await order.currentOrder({...req.body,...req.params});
    res.send("created");
    
})

export default orders;