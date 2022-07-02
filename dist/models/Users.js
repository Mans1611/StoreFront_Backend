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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const aggregatingQueries_1 = __importDefault(require("../handlers/aggregatingQueries"));
dotenv_1.default.config();
class User {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield Client_1.default.connect();
                const sqlCommand = `SELECT * FROM Users;`;
                const result = yield connection.query(sqlCommand);
                connection.release();
                return result.rows;
            }
            catch (err) {
                console.log(err);
                return 'there is an error in index user';
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlCommand = `SELECT firstname,lastname,user_id FROM Users WHERE user_id=($1)`;
            try {
                const connection = yield Client_1.default.connect();
                const result = yield connection.query(sqlCommand, [id]);
                connection.release();
                if (result.rowCount > 0)
                    return result.rows[0];
                return `this user is not found`;
            }
            catch (err) {
                console.log(err);
                return 'there is an error';
            }
        });
    }
    completeOrder(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield Client_1.default.connect();
            try {
                const user = yield this.show(req.params.id);
                const payload = JSON.parse(req.headers.payload);
                if (typeof (user) === 'string')
                    return 'this user is not Found';
                if (user.user_id != payload.user_id)
                    return 'this token is not for this user id';
            }
            catch (err) {
                console.log(err);
                return 'an error occures while authuntication';
            }
            try {
                const sqlCommand = `SELECT name,price,status,Orders.order_id,quantity FROM orderProducts JOIN Orders ON orderProducts.order_id=Orders.order_id JOIN Products ON orderProducts.product_id=Products.product_id  WHERE user_id=($1) AND status='Complete' ORDER BY Orders.order_id ASC`;
                const result = yield connection.query(sqlCommand, [req.params.id]);
                connection.release();
                if (result.rowCount > 0)
                    return (0, aggregatingQueries_1.default)(result.rows);
                return 'this user has no complete orders';
            }
            catch (err) {
                console.log(err);
                return 'an error occured in complete orders';
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = parseInt(process.env.salt);
                const hashedPass = bcrypt_1.default.hashSync(user.password, salt);
                const connection = yield Client_1.default.connect();
                const sqlCommand = `INSERT INTO Users (firstname,lastname,password) VALUES($1,$2,$3)`;
                yield connection.query(sqlCommand, [user.firstname, user.lastname, hashedPass]);
                connection.release();
                return "user is created";
            }
            catch (err) {
                console.log(err);
                return "error in creatin new user";
            }
        });
    }
    updateUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield Client_1.default.connect();
                const user = yield this.show(req.params.id);
                // this condition to avoid the error message from show method
                if (typeof (user) === 'string')
                    return 'this user dosnt exist ';
                const payload = JSON.parse(req.headers.payload);
                // this below condition is to verify the payload from the token provided 
                if (payload.user_id != user.user_id)
                    return 'the token is not for this user';
                /* the next 3 conditions for giving the user the flexiability to update the wanted feilds
                   not all the fields
                */
                if (req.body.firstname && req.body.firstname !== "") {
                    const sqlCommand = `UPDATE Users SET firstname=($1) WHERE user_id=($2)`;
                    yield connection.query(sqlCommand, [req.body.firstname, req.params.id]);
                }
                if (req.body.lastname && req.body.lastname !== "") {
                    const sqlCommand = `UPDATE Users SET lastname=($1) WHERE user_id=($2)`;
                    yield connection.query(sqlCommand, [req.body.lastname, req.params.id]);
                }
                if (req.body.password && req.body.password !== "") {
                    const salt = parseInt(process.env.salt);
                    const sqlCommand = `UPDATE Users SET password=($1) WHERE user_id=($2)`;
                    // we need to crypt the password before updating it 
                    const newPass = bcrypt_1.default.hashSync(req.body.password, salt);
                    yield connection.query(sqlCommand, [newPass, req.params.id]);
                }
                connection.release();
                return 'updating is over';
            }
            catch (err) {
                console.log(err);
                return 'error while updating processs';
            }
        });
    }
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // since the relation between orders and users so it is must be deleted from both
            const sqlCommand_1 = `DELETE FROM Orders WHERE user_id=($1)`;
            const sqlCommand_2 = 'DELETE FROM Users WHERE user_id=($1)';
            try {
                const connection = yield Client_1.default.connect();
                const result = yield connection.query('SELECT * FROM Users WHERE user_id=($1)', [req.params.id]);
                const payload = JSON.parse(req.headers.payload);
                if (result.rowCount > 0) {
                    if (result.rows[0].user_id == payload.user_id) {
                        yield connection.query(sqlCommand_2, [req.params.id]);
                        yield connection.query(sqlCommand_1, [req.params.id]);
                        return 'This user is deleted';
                    }
                    else {
                        return 'check this token agian for this user';
                    }
                }
                connection.release();
                return 'This user is not exist to delete';
            }
            catch (err) {
                console.log(err);
                return 'An error occured While delteing this user';
            }
        });
    }
}
exports.default = User;
