import express,{Request,Response} from "express";
import tokenVerify from "../middleware/tokenVerify";
import Products from "../models/Products";
const products = express.Router();


const product = new Products();
products.get('/',(req:Request,res:Response)=>{
    res.status(200).send("Products Section");
})
products.get('/index',tokenVerify,async (req:express.Request,res:express.Response)=>{
    const result = await product.index();
    res.send(result);
})

products.get('/show/:id',tokenVerify,async(req:Request,res:Response)=>{
    const result = await product.show(req.params.id);
    res.send(result);
})


products.get('/category/:cat',async(req:Request,res:Response)=>{
    const result = await product.category(req.params.cat);
    res.send(result);
})

products.get('/popularProducts',async (req:Request,res:Response)=>{
    const result = await product.popularProducts();
    res.send(result)
})

products.post('/create',tokenVerify,async (req:Request,res:Response)=>{
    const {name, price, category} = req.body;
    if(!name || !price || !category)
        return res.status(400).send("provide a full body to create this product name,price and category");
    
    const result = await product.create(req.body);
    res.status(201).send(result);
})
products.put('/update/:id',async(req:Request,res:Response)=>{
    const {name, price, category} = req.body;
    if(!name && !price && !category)
        return res.status(400).send("you have to update at least on field for this product");
    const result = await product.updateProduct(req);
    res.send(result)
})
products.delete('/deleteProduct/:id',async (req:Request,res:Response)=>{
    const result = await product.deleteProduct(req.params.id);
    res.status(200).send(result);
})

export default products;
