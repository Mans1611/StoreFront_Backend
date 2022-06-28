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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Products {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield Client_1.default.connect();
                const sqlCommand = `SELECT * FROM Products;`;
                const result = yield connection.query(sqlCommand);
                connection.release();
                return result.rows;
            }
            catch (err) {
                console.log(err);
                return "you have an error in index";
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield Client_1.default.connect();
                const sqlCommand = `SELECT * FROM Products WHERE product_id=($1);`;
                const result = yield connection.query(sqlCommand, [id]);
                // this conditoin for checking if the product is exist or not
                connection.release();
                if (result.rowCount > 0)
                    return result.rows[0];
                else {
                    return 'this product is not exist';
                }
            }
            catch (err) {
                console.log(err);
                return "you have an error in show method";
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommand = `INSERT INTO Products (name,price,category) VALUES($1,$2,$3);`;
            try {
                const connection = yield Client_1.default.connect();
                const { name, price, category } = product;
                yield connection.query(sqlCommand, [name, price, category]);
                connection.release();
                return 'done';
            }
            catch (err) {
                console.log(err);
                return 'there is an error';
            }
        });
    }
    popularProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommand = `SELECT name,SUM(product_quantity) AS quantity FROM Products INNER JOIN Orders ON Products.product_id=Orders.product_id GROUP BY (Orders.product_id,Products.name) ORDER BY SUM(product_quantity) DESC LIMIT 5`;
            const connection = yield Client_1.default.connect();
            const result = yield connection.query(sqlCommand);
            if (result.rowCount > 1)
                return result.rows;
            return 'There is no orders yet ';
        });
    }
    category(cat) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommand = `SELECT * FROM Products WHERE category=($1)`;
            try {
                const connection = yield Client_1.default.connect();
                const result = yield connection.query(sqlCommand, [cat]);
                connection.release();
                if (result.rowCount > 0)
                    return result.rows;
                else {
                    return 'this category is not found';
                }
            }
            catch (err) {
                console.log(err);
                return 'an error occurd';
            }
        });
    }
    updateProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield Client_1.default.connect();
                const user = yield this.show(req.params.id);
                if (typeof (user) === 'string')
                    return 'this item is not found';
                if (req.body.name !== '') {
                    const sqlCommand = `UPDATE Products SET name=($1) WHERE product_id=($2)`;
                    yield connection.query(sqlCommand, [req.body.name, req.params.id]);
                }
                if (req.body.price !== '') {
                    const price = parseInt(req.body.price); // this to make sure it is a number as in the database
                    const sqlCommand = `UPDATE Products SET price=($1) WHERE product_id=($2)`;
                    yield connection.query(sqlCommand, [price, req.params.id]);
                }
                if (req.body.category !== '') {
                    const sqlCommand = `UPDATE Products SET category=($1) WHERE product_id=($2)`;
                    yield connection.query(sqlCommand, [req.body.category, req.params.id]);
                }
                connection.release();
                return 'updating prodct is done';
            }
            catch (err) {
                console.log(err);
                return 'error while updating processs';
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommand_1 = `DELETE FROM Orders WHERE product_id=($1)`;
            const sqlCommand_2 = `DELETE FROM Products WHERE product_id=($1)`;
            try {
                const connection = yield Client_1.default.connect();
                const result = yield connection.query('SELECT * FROM Products WHERE product_id=($1)', [id]);
                // the consition below is to check wheater this id of this product exist in the database or not 
                if (result.rowCount > 0) {
                    yield connection.query(sqlCommand_1, [id]);
                    yield connection.query(sqlCommand_2, [id]);
                    return 'The product is deleted';
                }
                connection.release();
                return ' this product is not exist';
            }
            catch (err) {
                console.log(err);
                return 'an error occured while removing this product';
            }
        });
    }
}
exports.default = Products;
