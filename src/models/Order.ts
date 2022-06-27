import client from "../Client";
import express ,{Request,Response} from 'express';
export type order_type = {
    user_id:String,
    product_id:String,
    product_quantity:Number,
    status:String
}


export default class Order{

    async getAll():Promise<order_type[] | string>{
        const sqlCommand = `SELECT * FROM Orders`;
        try{
            const connection = await client.connect();
            const result = await connection.query(sqlCommand);
            return result.rows;
        }
        catch(err){
            console.log(err);
            
            return 'there is an error in get all';
        }

    }
    async currentOrder(order:order_type):Promise<order_type| string>{
        const sqlCommand = `INSERT INTO Orders(product_id,user_id,product_quantity,status) VALUES($1,$2,$3,$4)`;
        console.log(order);
        
        try{
            const connection = await client.connect();
            const result = await connection.query(sqlCommand,[order.product_id,order.user_id,order.product_quantity,order.status]);
            return result.rows[0];
        }
        catch(err){
            console.log(err);
            return 'There is an error in creating';
        }
    }
}