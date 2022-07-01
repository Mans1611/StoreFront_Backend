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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Client_1 = __importDefault(require("../Client"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/*
           the code below is to provide the id of the the user which was created
           in the token, this will help me to check for another authorization end points
*/
const asignUserIDToToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield Client_1.default.connect();
    const users = (yield connection.query('SELECT user_id FROM users')).rows;
    const { user_id } = users[users.length - 1];
    const token = jsonwebtoken_1.default.sign({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        user_id
    }, process.env.jwt);
    return token;
});
exports.default = asignUserIDToToken;
