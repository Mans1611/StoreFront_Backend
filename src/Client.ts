import { Client,Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config();

const {host,database,username,pass,database_test} = process.env;

let client:Pool ;

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'test'){
    client = new Pool({
        host,
        database :database_test,
        user:database, // same name
        password:pass
    });
    console.log("passed here if ");
    
}

else{
    client = new Pool({
        host,
        database,
        user:database,
        password:pass
    });
    console.log("passed here else");
}

export default client;