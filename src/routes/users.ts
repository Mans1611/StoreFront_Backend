import express ,{Request,Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { user_type } from '../models/Users';
import dotenv from 'dotenv';
import tokenVerify from '../middleware/tokenVerify';
import client from '../Client';
const users = express.Router();
const user = new User();

dotenv.config()

// so the token must be provided in the header of the request
users.get('/index', tokenVerify,async (req:Request,res:Response)=>{
    const result = await user.index();
    res.json(result);
})

users.get('/show/:id',tokenVerify,async(req:Request,res:Response)=>{
    const result = await user.show(req.params.id);
    if(result.length === 0 || typeof(result) === 'string' ){
        res.send("this user is exist")
    }else{
        const payload = JSON.parse(req.headers.payload as string);
        console.log(payload);
        console.log(result[0]);
        
        if(payload.firstName === result[0].firstname && payload.lastName === result[0].lastname)
            res.status(200).send(result[0]);
        else{
            // if the user data in the database do not match the one in the token
            res.status(404).send("Check the token again"); 
        }
    }

})


users.post('/create',async (req:Request,res:Response)=>{
    try{
        const result = await user.create((req.body as unknown) as user_type); 
        // so if it passes from the above line so this means that the user is created, and we need token for this.user;
        const token = jwt.sign({firstName:req.body.firstName,lastName:req.body.lastName},process.env.jwt as string);    
        res.setHeader("tokenvalue",token); // i sent the token value in response header. 
        res.status(201).send(result);
    }catch(err){
        console.log(err);
        
    }
    
})

export default users;