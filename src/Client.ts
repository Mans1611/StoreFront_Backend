import { Client,Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config();

const {host,database,username,pass} = process.env;

let client:Pool ;


client = new Pool({
    host,
    database,
    user:database, // same name
    password:pass
});


// else{
//     client = new Pool({
//         host,
//         database,
//         user:"postgres",
//         password:pass
//     });
// }




export default client;