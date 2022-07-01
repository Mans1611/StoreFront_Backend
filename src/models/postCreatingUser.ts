import jwt from "jsonwebtoken";  
import  {Request} from "express";
import client from "../Client";
import dotenv from 'dotenv';

dotenv.config();
/* 
           the code below is to provide the id of the the user which was created
           in the token, this will help me to check for another authorization end points
*/

const asignUserIDToToken  = async (req:Request):Promise<String>=>{
        const connection = await client.connect();
         const users =  (await connection.query('SELECT user_id FROM users')).rows;
         const {user_id} = users[users.length-1];  
         const token = jwt.sign(
             {
                 firstName:req.body.firstname,
                 lastName:req.body.lastname,
                 user_id},process.env.jwt as string);
                return token;

}   

export default asignUserIDToToken;