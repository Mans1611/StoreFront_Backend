import { order_type } from "../models/Order";
import { product_type } from "../models/Products";

export type completeOrder = {
    order_id:String,
    status:String,
    Total:Number,
    products:product_type[]
}

type incomingOrder = {
    name:String,
    price: number,
    user_id : String,
    status:String,
    order_id:String,
    quantity:number
}


const aggregatingQueries = (orders:incomingOrder[]):completeOrder[]=>{
    let ordersArray:completeOrder[] = [];
    let productsArray: product_type[] = [];

    let product: product_type = {
        name : orders[0].name,
        price : orders[0].price,
        quantity:orders[0].quantity
    }
    productsArray.push(product);
    let sum = orders[0].price * orders[0].quantity
    let order:completeOrder = {
        order_id : orders[0].order_id,
        status : "Complete",
        products:productsArray,
        Total:sum
    }
    ordersArray.push(order);



    for(let i = 1 ; i<orders.length;i++){

        if(orders[i].order_id == orders[i-1].order_id){
            product = {
                name:orders[i].name,
                price:orders[i].price,
                quantity:orders[i].quantity
            }
            productsArray.push(product);
            sum += (orders[i].price * orders[i].quantity);
            order.products = productsArray;
            order.Total = sum;
            

        }else{
            ordersArray.push(order);
            productsArray = [];
            
            product = {
                name:orders[i].name,
                price:orders[i].price,
                quantity:orders[i].quantity
            }
            sum = orders[i].price * orders[i].quantity;
            productsArray.push(product);
            order = {
                order_id:orders[i].order_id,
                status:"Complete",
                products:productsArray,
                Total:sum
            }
            
        }
    }

    return ordersArray;
 
}


export default aggregatingQueries;