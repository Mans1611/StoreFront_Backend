import express ,{Request,Response} from 'express';
import client from "../Client";
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export type product_type = {
    id?:Number
    name:String
    price?:Number
    category?:String // since it is optional
    quantity?:Number 
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

    async popularProducts():Promise <product_type[]>{
        const sqlCommand = `SELECT name,SUM(product_quantity) FROM Products INNER JOIN Orders ON Products.product_id=Orders.product_id GROUP BY (Orders.product_id,Products.name) ORDER BY SUM(product_quantity) DESC`;
        //const sqlCommand_2 = `SELECT  product_id,SUM(product_quantity) FROM Orders GROUP BY product_id ORDER BY SUM(product_quantity) DESC`;
        const connection = await client.connect();
        const result = await connection.query(sqlCommand);
        return result.rows;
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

    async deleteProduct(id:String):Promise <string>{
        const sqlCommand_1 = `DELETE FROM Orders WHERE product_id=($1)`;
        const sqlCommand_2 = `DELETE FROM Products WHERE product_id=($1)`;
        try{
            const connection = await client.connect();
            const result = await connection.query('SELECT * FROM Products WHERE product_id=($1)',[id]);
            // the consition below is to check wheater this id of this product exist in the database or not 
            if(result.rowCount > 0){
                await connection.query(sqlCommand_1,[id]);
                await connection.query(sqlCommand_2,[id]);
                return 'The product is deleted';
            }
            return ' this product is not exist';
        }catch(err){
            console.log(err);
            return 'an error occured while removing this product'
        }
    }

}