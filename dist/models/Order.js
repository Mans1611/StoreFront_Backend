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
            const sqlCommand = `SELECT Users.user_id,Orders.product_id,Orders.id,status FROM Users INNER JOIN Orders ON Orders.user_id=Users.user_id WHERE Users.user_id=($1)`;
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
            const sqlCommand = `INSERT INTO Orders(product_id,user_id,product_quantity,status) VALUES($1,$2,$3,$4)`;
            try {
                const connection = yield Client_1.default.connect();
                const result = yield connection.query(sqlCommand, [order.product_id, order.user_id, order.product_quantity, order.status]);
                return "Order is created ";
            }
            catch (err) {
                console.log(err);
                return 'There is an error in creating';
            }
        });
    }
}
exports.default = Order;
