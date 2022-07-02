import express ,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import User, { user_type } from '../models/Users';
import dotenv from 'dotenv';
import tokenVerify from '../middleware/tokenVerify';
import client from '../Client';
import asignUserIDToToken from '../models/postCreatingUser';
const users = express.Router();
const user = new User();

dotenv.config()

// so the token must be provided in the header of the request
users.get("/",(req:Request,res:Response)=>{
    res.status(200).send("this is users route")

})
users.get('/index', tokenVerify,async (req:Request,res:Response)=>{
    const result = await user.index();
    res.json(result);
})

users.get('/show/:id',tokenVerify,async(req:Request,res:Response)=>{
    const result = await user.show(req.params.id); 
    if(typeof(result) === 'string' ){
        res.status(404).send("this user is not exist")
    }
    else{
        const payload = JSON.parse(req.headers.payload as string);

        if(payload.user_id === result.user_id)
            res.status(200).send(result);
            else{
            // if the user data in the database do not match the one in the token
            res.status(404).send("Check the token again"); 
        }
    }

})

users.get('/completeOrder/:id',tokenVerify,async (req:Request,res:Response)=>{
    const result = await user.completeOrder(req);
    res.send(result);
})



users.post('/create',async (req:Request,res:Response)=>{
    try{

        // to check validation of the the body.
        const {firstname,lastname,password} = req.body;
        
        if(!firstname || !lastname)
            return res.status(401).send("the body is incorrect you  must provide firstname & lastname");
        if(!password)
            return res.status(400).send("provide a password in the body please");

            const result = await user.create((req.body as unknown) as user_type); 
            const token = await asignUserIDToToken(req);
            res.setHeader("tokenValue",token as string);
        // so if it passes from the above line so this means that the user is created, and we need token for this.user;
        
        res.status(201).send(result);
    }catch(err){
        console.log(err);
        return "Can't create this user, try again later";
    }
    
})
users.put('/update/:id',tokenVerify,async(req:Request,res:Response)=>{
    const {firstname,lastname,password} = req.body;
    if(!firstname && !lastname && !password)
        return res.status(400).send("you have to update at leaset one field: firstname,lastname or password");

    const result = await user.updateUser(req);
    res.send(result);
})

users.delete('/delete/:id',tokenVerify,async (req:Request,res:Response)=>{
    try{    
        const result = await user.deleteUser(req);
        res.status(200).send(result)
    }
    catch(err){
        console.log(err);
        return 'can not delet this person'
        
    }
})

export default users;