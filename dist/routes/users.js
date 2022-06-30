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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const dotenv_1 = __importDefault(require("dotenv"));
const tokenVerify_1 = __importDefault(require("../middleware/tokenVerify"));
const Client_1 = __importDefault(require("../Client"));
const users = express_1.default.Router();
const user = new Users_1.default();
dotenv_1.default.config();
// so the token must be provided in the header of the request
users.get('/index', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user.index();
    res.json(result);
}));
users.get('/show/:id', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user.show(req.params.id);
    if (typeof (result) === 'string') {
        res.status(404).send("this user is not exist");
    }
    else {
        const payload = JSON.parse(req.headers.payload);
        if (payload.user_id === result.user_id)
            res.status(200).send(result);
        else {
            // if the user data in the database do not match the one in the token
            res.status(404).send("Check the token again");
        }
    }
}));
users.get('/completeOrder/:id', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user.completeOrder(req);
    res.send(result);
}));
users.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user.create(req.body);
        // so if it passes from the above line so this means that the user is created, and we need token for this.user;
        const connection = yield Client_1.default.connect();
        /*
           the code below is to provide the id of the the user which was created
           in the token, this will help me to check for another authorization end points
        */
        const users = (yield connection.query('SELECT user_id FROM users')).rows;
        const { user_id } = users[users.length - 1];
        const token = jsonwebtoken_1.default.sign({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            user_id
        }, process.env.jwt);
        res.setHeader("tokenvalue", token); // i sent the token value in response header. 
        res.status(201).send(result);
    }
    catch (err) {
        console.log(err);
    }
}));
users.put('/update/:id', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user.updateUser(req);
    res.send(result);
}));
users.delete('/delete/:id', tokenVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user.deleteUser(req);
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        return 'can not delet this person';
    }
}));
exports.default = users;
