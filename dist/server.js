"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const orders_1 = __importDefault(require("./routes/orders"));
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const Port = process.env.PORT;
// bodyParder middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
// routes middleware  
app.use('/products', products_1.default);
app.use('/users', users_1.default);
app.use('/orders', orders_1.default);
app.get('/', (req, res) => {
    res.send("hello mansour");
});
app.listen(Port, () => {
    console.log(`You are running on the server http://localhost:${Port}`);
});
exports.default = app;
