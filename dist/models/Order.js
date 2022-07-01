"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("../Client"));
class Order {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommand = `SELECT * FROM Orders`;
            try {
                const connection = yield Client_1.default.connect();
                const result = yield connection.query(sqlCommand);
                return result.rows;
            }
            catch (err) {
                console.log(err);
                return 'there is an error in get all';
            }
        });
    }
    currentOrder(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommand = `SELECT  orderProducts.quantity,orderProducts.product_id,Products.name FROM Orders 
        JOIN orderProducts ON Orders.order_id = orderProducts.order_id Join Products ON orderProducts.product_id = Products.product_id  WHERE (Orders.user_id=($1)) AND (Orders.order_id=($2))`;
            // WHERE [condition1] AND [condition2]...AND [conditionN]
            try {
                const connection = yield Client_1.default.connect();
                const result = yield connection.query(sqlCommand, [req.params.user_id, req.params.order_id]);
                connection.release();
                const payload = JSON.parse(req.headers.payload);
                if (payload.user_id != req.params.user_id)
                    return 'this token is not for this id';
                if (result.rowCount > 0) {
                    let user_order = {
                        user_id: req.params.user_id,
                        order_id: req.params.order_id,
                        status: result.rows[0].status,
                        product_details: result.rows,
                    };
                    return user_order;
                }
                return 'there is no orders';
            }
            catch (err) {
                console.log(err);
                return ' error in returnning current orders';
            }
        });
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommand = `INSERT INTO Orders(user_id,status) VALUES($1,$2)`;
            const sqlCommand_2 = `INSERT INTO orderProducts(order_id,product_id,quantity) VALUES($1,$2,$3)`;
            const product_quantity_list = order.product_quantity.split(",");
            const product_id_list = order.product_id.split(",");
            try {
                const connection = yield Client_1.default.connect();
                yield connection.query(sqlCommand, [order.user_id, order.status]);
                const orderes = (yield connection.query('SELECT order_id FROM Orders')).rows;
                const { order_id } = orderes[orderes.length - 1];
                // this for loop for adding many products in the same order 
                for (let i = 0; i < product_id_list.length; i++) {
                    const product_quantity = parseInt(product_quantity_list[i]); //to convert it to number
                    const product_id = parseInt(product_id_list[i]);
                    try {
                        yield connection.query(sqlCommand_2, [order_id, product_id, product_quantity]);
                    }
                    catch (err) {
                        console.log(err);
                        return 'check the product id again';
                    }
                }
                return "Order is created";
            }
            catch (err) {
                console.log(err);
                return 'There is an error in creating';
            }
        });
    }
    deleteOrder(order_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommandVerify = `SELECT order_id,user_id FROM Orders WHERE order_id=($1)`;
            try {
                const connection = yield Client_1.default.connect();
                const order = yield connection.query(sqlCommandVerify, [order_id]);
                if (order.rowCount == 0)
                    return 'this order is not exist to delete';
                /* this condition just to verify that the user_id in the token is the same as the user_id in the order type
                    as a result the user can just remove his orders
                */
                if (order.rows[0].user_id == user_id) {
                    const sqlCommand = `DELETE FROM orderProducts WHERE order_id=($1)`;
                    const sqlCommand_2 = `DELETE FROM Orders WHERE order_id=($1)`;
                    yield connection.query(sqlCommand, [order_id]);
                    yield connection.query(sqlCommand_2, [order_id]);
                    connection.release();
                    return 'order is deleted';
                }
                connection.release();
                return 'this order is not for this user';
            }
            catch (err) {
                console.log(err);
                return 'there is an erro in deleting this order';
            }
        });
    }
}
exports.default = Order;
