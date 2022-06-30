import express ,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
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
        const result = await user.create((req.body as unknown) as user_type); 
        // so if it passes from the above line so this means that the user is created, and we need token for this.user;
        const  connection = await client.connect();
        
        /* 
           the code below is to provide the id of the the user which was created
           in the token, this will help me to check for another authorization end points
        */
        const users =  (await connection.query('SELECT user_id FROM users')).rows;
        const {user_id} = users[users.length-1];  
        const token = jwt.sign(
            {
                firstName:req.body.firstname,
                lastName:req.body.lastname,
                user_id},process.env.jwt as string);

        res.setHeader("tokenvalue",token); // i sent the token value in response header. 
        
        
        res.status(201).send(result);
    }catch(err){
        console.log(err);
        
    }
    
})
users.put('/update/:id',tokenVerify,async(req:Request,res:Response)=>{
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