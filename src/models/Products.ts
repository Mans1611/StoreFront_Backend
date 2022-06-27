import express ,{Request,Response} from 'express';
import client from "../Client";
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export type product_type = {
    id?:Number
    name:String
    price:Number
    category?:String // since it is optional 
}

export default class Products{

    async index():Promise<product_type[] | string>{
        try{
            const connection = await client.connect();
            const sqlCommand = `SELECT * FROM Products;`;
            const result = await connection.query(sqlCommand);
            return result.rows;
        }catch(err){
            console.log(err);
            return "you have an error in index";
        }
    }

    async show(id:string):Promise<product_type | string>{
        try{
            const connection = await client.connect();
            const sqlCommand = `SELECT * FROM Products WHERE user_id=($1);`;
            const result = await connection.query(sqlCommand,[id]);
            
            // this conditoin for checking if the product is exist or not
            if(result.rowCount>0)
                return result.rows[0];
            else {
                return 'this product is not exist';
            }

        }catch(err){
            console.log(err);
            return "you have an error in show method";
        }
    }


    async create(req:Request):Promise<string> {
        const sqlCommand = `INSERT INTO Products (name,price,category) VALUES($1,$2,$3);`;
        try{
            const connection = await client.connect();
            const {name,price,category} = req.body;
            await connection.query(sqlCommand,[name,price,category]);
            return 'done';
        }catch(err){
            console.log(err);
            return 'there is an error';
        }


    }

    async category(cat:string):Promise<product_type[] | string>{
        const sqlCommand = `SELECT * FROM Products WHERE category=($1)`;
        try{
            const connection = await client.connect();
            const result = await connection.query(sqlCommand,[cat]);
            
            if(result.rowCount>0)
                return result.rows;
            else{
                return 'this category is not found'
            }
        }catch(err){
            console.log(err);
            return 'an error occurd'
        }

    }

}