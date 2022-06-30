import { Client,Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config();

const {host,database,mans_database,user,pass,database_test}=
 process.env;

let client:Pool ;


if(process.env.ENV === 'test'){
    client = new Pool({
        host,
        database :database_test,
        user:user, // same name
        password:pass
    });
    
}
else{
    client = new Pool({
        host,
        database:database,
        user:user,
        password:pass
    });
}


export default client;