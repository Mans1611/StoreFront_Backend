import express from 'express';
import jwt from 'jsonwebtoken';
import User, { user_type } from '../models/Users';
import dotenv from 'dotenv';
const users = express.Router();
const user = new User();

dotenv.config()

users.get('/index',async (req:express.Request,res:express.Response)=>{
    const result = await user.index();
    res.json(result);
})

users.post('/create',async (req,res)=>{
    try{
        const result = await user.create((req.body as unknown) as user_type);
        const token = jwt.sign({firstName:req.body.firstName,lastName:req.body.lastName},process.env.jwt as string);    
        res.setHeader("tokenvalue",token); // i sent the token value in response header. 
        res.send(result);
    }catch(err){
        console.log(err);
        
    }
    
})

export default users;