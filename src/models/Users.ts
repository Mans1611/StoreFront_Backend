import client from "../Client";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request,Response } from "express";
import { order_type } from "./Order";
export type user_type = {
    id?:Number,
    firstname:String,
    lastname:String,
    password?:String
}


dotenv.config()


export default class User {

    async index():Promise<user_type[] | string >{
        try{
            const connection = await client.connect();
            const sqlCommand = `SELECT user_id,firstname,lastname FROM Users;`
            const result = await connection.query(sqlCommand);
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
            return result.rows[0];
        }catch(err){
            console.log(err);
            return 'there is an error'
        }
   }

    async completeOrder(req:Request):Promise <order_type[] | string>{
        const connection = await client.connect();
        try{
             const user = await this.show(req.params.id);
             const payload = JSON.parse(req.headers.payload as string);
             if(typeof(user)==='string')
                return 'this user is not Found';
            
             if((user.firstname !== payload.firstName) || (user.lastname !== payload.lastName))
                return 'this token is not for this user id';

        }
        catch(err){
            console.log(err);
            return 'an error occures while authuntication';
        }
        try{
            const sqlCommand = `SELECT name,Orders.product_id,status FROM Orders INNER JOIN Products ON Products.product_id=Orders.product_id  WHERE user_id=($1) AND status='Complete'`;
            const result = await connection.query(sqlCommand,[req.params.id])
            if(result.rowCount>0)
                return result.rows;
            return 'this user has no complete orders';
        }catch(err){
            console.log(err);
            return 'an error occured in complete orders';
            
        }
    }


    async create(user:user_type):Promise<string>{
        try{console.log(process.env.salt);
            const salt = parseInt(process.env.salt as string);

            const hashedPass = bcrypt.hashSync(user.password as string ,salt);
            const connection = await client.connect();
            const sqlCommand = `INSERT INTO Users (firstName,lastName,password) VALUES($1,$2,$3)`;
            await connection.query(sqlCommand,[user.firstname,user.lastname,hashedPass]);
            return "user is created"
        }catch(err){
            console.log(err);
            return "error in creatin new user"
        }

    }
    async deleteUser(req:Request):Promise<string>{


        const sqlCommand_1 = `DELETE FROM Orders WHERE user_id=($1)`;
        const sqlCommand_2 = 'DELETE FROM Users WHERE user_id=($1)';
        
        try{
            const connection = await client.connect();
            const result = await connection.query('SELECT * FROM Users WHERE user_id=($1)',[req.params.id]);
            const payload = JSON.parse(req.headers.payload as string);

            if(result.rowCount>0){
                if(result.rows[0].firstname===payload.firstName && result.rows[0].lastname===payload.lastName){
                    await connection.query(sqlCommand_2,[req.params.id]);
                    await connection.query(sqlCommand_1,[req.params.id]);
                    return 'This user is deleted'
                }else{
                    return 'check this token agian for this user';
                }
            }
            return 'This user is not exist to delete';

        }catch(err){
            console.log(err);
            return 'An error occured While delteing this user';
        }
    }

}