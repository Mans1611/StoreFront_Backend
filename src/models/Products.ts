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
            connection.release();
            return result.rows;
        }catch(err){
            console.log(err);
            return "you have an error in index";
        }
    }

    async show(id:string):Promise<product_type | string>{
        try{
            const connection = await client.connect();
            const sqlCommand = `SELECT * FROM Products WHERE product_id=($1);`;
            const result = await connection.query(sqlCommand,[id]);
            
            // this conditoin for checking if the product is exist or not
            connection.release();
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


    async create(product:product_type):Promise<string> {
        const sqlCommand = `INSERT INTO Products (name,price,category) VALUES($1,$2,$3);`;
        try{
            const connection = await client.connect();
            const {name,price,category} = product;
            await connection.query(sqlCommand,[name,price,category]);
            connection.release();
            return 'done';
        }catch(err){
            console.log(err);
            return 'there is an error';
        }
    }

    async popularProducts():Promise <product_type[] | string>{
        const sqlCommand = `SELECT name,SUM(quantity) AS "NUMBER OF ITEMS SOLD" FROM Products INNER JOIN orderProducts ON Products.product_id=orderProducts.product_id 
                            GROUP BY (orderProducts.product_id,Products.name) ORDER BY SUM(quantity) DESC LIMIT 5`;
        
        try{
            const connection = await client.connect();
            const result = await connection.query(sqlCommand);
            if(result.rowCount>1)
            return result.rows;
            return 'There is no orders yet '

        }
        catch(err){
            console.log(err);
            return 'there is an error in popular roducts';
            
        }
    }


    async category(cat:string):Promise<product_type[] | string>{
        const sqlCommand = `SELECT * FROM Products WHERE category=($1)`;
        try{
            const connection = await client.connect();
            const result = await connection.query(sqlCommand,[cat]);
            connection.release();
            
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

    async updateProduct(req:Request):Promise<string>{
        try{
            const connection = await client.connect();
            const user = await this.show(req.params.id);
            if(typeof(user)==='string')
                return 'this item is not found';

            if(req.body.name && req.body.name!==''){
                    const sqlCommand = `UPDATE Products SET name=($1) WHERE product_id=($2)`;
                    await connection.query(sqlCommand,[req.body.name,req.params.id]) ;
                
            }
            
            if(req.body.price!=='' && req.body.price){
                const price = parseInt(req.body.price); // this to make sure it is a number as in the database
                const sqlCommand = `UPDATE Products SET price=($1) WHERE product_id=($2)`;
                await connection.query(sqlCommand,[price,req.params.id]) ;
            }
            if(req.body.category!=='' && req.body.category){
                const sqlCommand = `UPDATE Products SET category=($1) WHERE product_id=($2)`;
                await connection.query(sqlCommand,[req.body.category,req.params.id]);
            }
            connection.release();
            return 'updating prodct is done'
               
              
            
        }catch(err){
            console.log(err);
            return 'error while updating processs';
            
        }

            
    }

    async deleteProduct(id:String):Promise <string>{
        const sqlCommand_1 = `DELETE FROM orderProducts WHERE product_id=($1)`;
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
            
            connection.release();
            return ' this product is not exist';
        }catch(err){
            console.log(err);
            return 'an error occured while removing this product'
        }
    }

}