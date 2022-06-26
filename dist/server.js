"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const Port = 5000;
app.get('/', (req, res) => {
    res.send("hello mansour");
});
app.listen(Port, () => {
    console.log(`You are running on the server http://localhost:${Port}`);
});
