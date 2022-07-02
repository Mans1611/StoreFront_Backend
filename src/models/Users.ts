import client from "../Client";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request,Response } from "express";
import { order_type } from "./Order";
import aggregatingQueries, { completeOrder } from "../handlers/aggregatingQueries";
export type user_type = {
    user_id?:Number,
    firstname:String,
    lastname:String,
    password?:String
}


dotenv.config()


export default class User {

    async index():Promise<user_type[] | string >{
        try{
            const connection = await client.connect();
            const sqlCommand = `SELECT * FROM Users;`
            const result = await connection.query(sqlCommand);
            connection.release();
            return result.rows;
        }catch(err){
            console.log(err);
            return 'there is an error in index user';
            
        }
    }
   async show(id:string):Promise<user_type | string> {
        const sqlCommand = `SELECT firstname,lastname,user_id FROM Users WHERE user_id=($1)`;
        try{
            const connection = await client.connect();
            const result = await connection.query(sqlCommand,[id]);
            connection.release();
            if(result.rowCount>0)
                return result.rows[0];
            
            return `this user is not found` ;
        }catch(err){
            console.log(err);
            return 'there is an error'
        }
   }

    async completeOrder(req:Request):Promise <completeOrder[] | string>{
        const connection = await client.connect();
        
        try{
             const user = await this.show(req.params.id);
             const payload = JSON.parse(req.headers.payload as string);
             if(typeof(user)==='string')
                return 'this user is not Found';
            
             if( user.user_id != payload.user_id )
                return 'this token is not for this user id';

        }
        catch(err){
            console.log(err);
            return 'an error occures while authuntication';
        }
        try{
            const sqlCommand = `SELECT name,price,status,Orders.order_id,quantity FROM orderProducts JOIN Orders ON orderProducts.order_id=Orders.order_id JOIN Products ON orderProducts.product_id=Products.product_id  WHERE user_id=($1) AND status='Complete' ORDER BY Orders.order_id ASC`;
            
            const result = await connection.query(sqlCommand,[req.params.id])
            connection.release();
            if(result.rowCount>0)
                return aggregatingQueries(result.rows);
            return 'this user has no complete orders';
        }catch(err){
            console.log(err);
            return 'an error occured in complete orders';
            
        }
    }


    async create(user:user_type):Promise<string>{
        try{
            const salt = parseInt(process.env.salt as string);
            const hashedPass = bcrypt.hashSync(user.password as string,salt);
            const connection = await client.connect();
            const sqlCommand = `INSERT INTO Users (firstname,lastname,password) VALUES($1,$2,$3)`;
            await connection.query(sqlCommand,[user.firstname,user.lastname,hashedPass]);
            connection.release();
            return "user is created"
        }catch(err){
            console.log(err);
            return "error in creatin new user"
        }

    }

    async updateUser(req:Request):Promise<string>{
        try{
            const connection = await client.connect();
            const user = await this.show(req.params.id);
           

            // this condition to avoid the error message from show method
            if(typeof(user)==='string')
                return 'this user dosnt exist '
            const payload = JSON.parse(req.headers.payload as string );
            
            // this below condition is to verify the payload from the token provided 
            
            if( payload.user_id != user.user_id )
               return 'the token is not for this user';
            
            /* the next 3 conditions for giving the user the flexiability to update the wanted feilds
               not all the fields  
            */ 

            if(req.body.firstname && req.body.firstname!==""){
                const sqlCommand = `UPDATE Users SET firstname=($1) WHERE user_id=($2)`;
                await connection.query(sqlCommand,[req.body.firstname,req.params.id]) ;    
            }
            if(req.body.lastname && req.body.lastname!==""){
                const sqlCommand = `UPDATE Users SET lastname=($1) WHERE user_id=($2)`;
                await connection.query(sqlCommand,[req.body.lastname,req.params.id]) ;
            }
            if(req.body.password && req.body.password!==""){
                    const salt = parseInt(process.env.salt as string);
                    const sqlCommand = `UPDATE Users SET password=($1) WHERE user_id=($2)`;
                    // we need to crypt the password before updating it 
                    const newPass = bcrypt.hashSync(req.body.password,salt);
                    await connection.query(sqlCommand,[newPass,req.params.id]);
            }
            connection.release();
            return 'updating is over';
              
        }catch(err){
            console.log(err);
            return 'error while updating processs';
            
        }

            
    }


    async deleteUser(req:Request):Promise<string>{

        // since the relation between orders and users so it is must be deleted from both
        const sqlCommand_1 = `DELETE FROM Orders WHERE user_id=($1)`;
        const sqlCommand_2 = 'DELETE FROM Users WHERE user_id=($1)';
        
        try{
            const connection = await client.connect();
            const result = await connection.query('SELECT * FROM Users WHERE user_id=($1)',[req.params.id]);
            const payload = JSON.parse(req.headers.payload as string);

            if(result.rowCount>0){
                if(result.rows[0].user_id == payload.user_id){
                    await connection.query(sqlCommand_2,[req.params.id]);
                    await connection.query(sqlCommand_1,[req.params.id]);
                    return 'This user is deleted'
                }else{
                    return 'check this token agian for this user';
                }
            }
            connection.release();
            return 'This user is not exist to delete';

        }catch(err){
            console.log(err);
            return 'An error occured While delteing this user';
        }
    }

}