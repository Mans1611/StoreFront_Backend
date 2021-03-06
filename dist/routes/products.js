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
const Products_1 = __importDefault(require("../models/Products"));
const products = express_1.default.Router();
const product = new Products_1.default();
products.get('/', (req, res) => {
    res.status(200).send("Products Section");
});
products.get('/index', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.index();
        res.send(result);
    }
    catch (err) {
        res.json({ "ordererror": err });
    }
}));
products.get('/show/:id', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.show(req.params.id);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
}));
products.get('/category/:cat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.category(req.params.cat);
        res.send(result);
    }
    catch (err) {
        res.send("you have an error to get this category");
    }
}));
products.get('/popularProducts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.popularProducts();
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
}));
products.post('/create', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, category } = req.body;
    if (!name || !price || !category)
        return res.status(400).send("provide a full body to create this product name,price and category");
    try {
        const result = yield product.create(req.body);
        res.status(201).send(result);
    }
    catch (err) {
        res.json({ "msg": err });
    }
}));
products.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, category } = req.body;
    if (!name && !price && !category)
        return res.status(400).send("you have to update at least on field for this product");
    try {
        const result = yield product.updateProduct(req);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
}));
products.delete('/deleteProduct/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.deleteProduct(req.params.id);
        res.status(200).send(result);
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = products;
