"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { host, database, username, pass, database_test } = process.env;
let client;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'test') {
    client = new pg_1.Pool({
        host,
        database: database_test,
        user: database,
        password: pass
    });
    console.log("passed here if ");
}
else {
    client = new pg_1.Pool({
        host,
        database,
        user: database,
        password: pass
    });
    console.log("passed here else");
}
exports.default = client;
