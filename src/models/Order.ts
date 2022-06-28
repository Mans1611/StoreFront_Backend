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
    async currentOrder(req:Request):Promise <order_type[] | string>{
        const sqlCommand = `SELECT Users.user_id,Orders.product_id,Orders.id,status FROM Users INNER JOIN Orders ON Orders.user_id=Users.user_id WHERE Users.user_id=($1)`;
        try{
            const connection = await client.connect();
            const result = await connection.query(sqlCommand,[req.params.id]);
            connection.release();
            const payload = JSON.parse(req.headers.payload as string);

            if(payload.user_id != req.params.id)
                return 'this token is not for this id';
            if(result.rowCount>0)
                return result.rows;
    
            return 'there is now orders';
        
        }catch(err){
            console.log(err);
            return ' error in returnning current orders'; 
        }

        }
    async createOrder (order:order_type):Promise<order_type| string>{
        const sqlCommand = `INSERT INTO Orders(product_id,user_id,product_quantity,status) VALUES($1,$2,$3,$4)`;
        try{
            const connection = await client.connect();
            const result = await connection.query(sqlCommand,[order.product_id,order.user_id,order.product_quantity,order.status]);
            return "Order is created ";
        }
        catch(err){
            console.log(err);
            return 'There is an error in creating';
        }
    }
}