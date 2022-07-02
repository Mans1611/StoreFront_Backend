"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenVerify = (req, res, next) => {
    if (req.headers.token === "" || !req.headers.token) {
        res.status(400).send("provide a token");
    }
    else {
        try {
            const verify = jsonwebtoken_1.default.verify(req.headers.token, process.env.jwt);
            req.headers.payload = JSON.stringify(verify); // i sent the payload of the token as a header proprty and i pass it as a string 
            next();
        }
        catch (err) {
            console.log(err);
            res.send("the token is not valid");
        }
    }
};
exports.default = tokenVerify;
