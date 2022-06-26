import express,{Request,Response} from "express";
import tokenVerify from "../middleware/tokenVerify";
import Products from "../models/Products";
const products = express.Router();


const product = new Products();
products.get('/show',async (req:express.Request,res:express.Response)=>{
    const result = await product.index();
    res.send(result);
})
products.get('/show/:id',tokenVerify,async(req:Request,res:Response)=>{
    console.log(req.params.id);
    const result = await product.show(req.params.id);
    res.send(result);
})
products.post('/create',tokenVerify,async (req:Request,res:Response)=>{
    const result = await product.create(req);
    res.send(result);
})

export default products;
