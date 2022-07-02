"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aggregatingQueries = (orders) => {
    let ordersArray = [];
    let productsArray = [];
    let product = {
        name: orders[0].name,
        price: orders[0].price,
        quantity: orders[0].quantity
    };
    productsArray.push(product);
    let sum = orders[0].price * orders[0].quantity;
    let order = {
        order_id: orders[0].order_id,
        status: "Complete",
        products: productsArray,
        Total: sum
    };
    ordersArray.push(order);
    for (let i = 1; i < orders.length; i++) {
        if (orders[i].order_id == orders[i - 1].order_id) {
            product = {
                name: orders[i].name,
                price: orders[i].price,
                quantity: orders[i].quantity
            };
            productsArray.push(product);
            sum += (orders[i].price * orders[i].quantity);
            order.products = productsArray;
            order.Total = sum;
        }
        else {
            ordersArray.push(order);
            productsArray = [];
            product = {
                name: orders[i].name,
                price: orders[i].price,
                quantity: orders[i].quantity
            };
            sum = orders[i].price * orders[i].quantity;
            productsArray.push(product);
            order = {
                order_id: orders[i].order_id,
                status: "Complete",
                products: productsArray,
                Total: sum
            };
        }
    }
    return ordersArray;
};
exports.default = aggregatingQueries;
