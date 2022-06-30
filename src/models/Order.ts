import client from "../Client";
import express ,{Request,Response} from 'express';
export type order_type = {
    user_id:String,
    product_id:String,
    product_quantity:string,
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
        const sqlCommand = `SELECT Orders.user_id, Orders.status, Orders.order_id,orderProducts.quantity,orderProducts.product_id FROM Orders INNER JOIN orderProducts ON Orders.order_id = orderProducts.order_id WHERE Orders.user_id=($1)`;
        
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
        const sqlCommand = `INSERT INTO Orders(user_id,status) VALUES($1,$2)`;
        const sqlCommand_2 = `INSERT INTO orderProducts(order_id,product_id,quantity) VALUES($1,$2,$3)`;
        const product_quantity_list = order.product_quantity.split(",");
        const product_id_list = order.product_id.split(",");

        try{
            const connection = await client.connect();
            await connection.query(sqlCommand,[order.user_id,order.status]);
            const orderes =  (await connection.query('SELECT order_id FROM Orders')).rows;
            const {order_id} = orderes[orderes.length-1];
            for(let i = 0 ;i<product_id_list.length;i++){
                const product_quantity = parseInt(product_quantity_list[i]) //to convert it to number
                const product_id = parseInt(product_id_list[i]);
                await connection.query(sqlCommand_2,[order_id,product_id,product_quantity])
            }
            return "Order is created";
        }
        catch(err){
            console.log(err);
            return 'There is an error in creating';
        }
    }
    async deleteOrder(order_id:string):Promise<string>{
        const sqlCommand = `DELETE FROM orderProducts WHERE order_id=($1)`;
        const sqlCommand_2 = `DELETE FROM Orders WHERE order_id=($1)`;
        try {
            const connection = await client.connect();
            await connection.query(sqlCommand,[order_id]);
            await connection.query(sqlCommand_2,[order_id]);
            connection.release();
            return 'order is deleted';
        }catch(err){
            console.log(err);
            return 'there is an erro in deleting this order';
        }
    }
}