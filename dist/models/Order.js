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
            const sqlCommand = `SELECT Orders.user_id, Orders.status, Orders.order_id,orderProducts.quantity,orderProducts.product_id FROM Orders INNER JOIN orderProducts ON Orders.order_id = orderProducts.order_id WHERE Orders.user_id=($1)`;
            try {
                const connection = yield Client_1.default.connect();
                const result = yield connection.query(sqlCommand, [req.params.id]);
                connection.release();
                const payload = JSON.parse(req.headers.payload);
                if (payload.user_id != req.params.id)
                    return 'this token is not for this id';
                if (result.rowCount > 0)
                    return result.rows;
                return 'there is now orders';
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
                for (let i = 0; i < product_id_list.length; i++) {
                    const product_quantity = parseInt(product_quantity_list[i]); //to convert it to number
                    const product_id = parseInt(product_id_list[i]);
                    yield connection.query(sqlCommand_2, [order_id, product_id, product_quantity]);
                }
                return "Order is created";
            }
            catch (err) {
                console.log(err);
                return 'There is an error in creating';
            }
        });
    }
    deleteOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommand = `DELETE FROM orderProducts WHERE order_id=($1)`;
            const sqlCommand_2 = `DELETE FROM Orders WHERE order_id=($1)`;
            try {
                const connection = yield Client_1.default.connect();
                yield connection.query(sqlCommand, [order_id]);
                yield connection.query(sqlCommand_2, [order_id]);
                connection.release();
                return 'order is deleted';
            }
            catch (err) {
                console.log(err);
                return 'there is an erro in deleting this order';
            }
        });
    }
}
exports.default = Order;
