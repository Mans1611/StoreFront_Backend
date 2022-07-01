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
const express_1 = __importDefault(require("express"));
const tokenVerify_1 = __importDefault(require("../middleware/tokenVerify"));
const Order_1 = __importDefault(require("../models/Order"));
const orders = express_1.default.Router();
const order = new Order_1.default();
orders.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order.getAll();
    res.send(result);
}));
orders.get('/currentOrder/:user_id/:order_id', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order.currentOrder(req);
    res.send(result);
}));
orders.post('/create/:user_id', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, product_quantity, product_id } = req.body;
    if (!status || !product_id || !product_quantity)
        return res.status(400).send("you have to provide all order requirements status,product_quantity and product_id in the body");
    const payload = JSON.parse(req.headers.payload);
    if (payload.user_id != req.params.user_id)
        return res.status(402).send('this token is not for this user');
    const result = yield order.createOrder(Object.assign(Object.assign({}, req.body), req.params));
    res.send(result);
}));
orders.delete('/deleteOrder/:order_id', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = JSON.parse(req.headers.payload);
    const result = yield order.deleteOrder(req.params.order_id, payload.user_id);
    return res.status(200).send(result);
}));
exports.default = orders;
