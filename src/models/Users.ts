import client from "../Client";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
export type user_type = {
    id?:Number,
    firstName:String,
    lastName:String,
    password?:String
}
dotenv.config()


export default class User {

    async index():Promise<user_type[] | string >{
        try{
            const connection = await client.connect();
            const sqlCommand = `SELECT id,firstName,lastName FROM Users;`
            const result = await connection.query(sqlCommand);
            return result.rows;
        }catch(err){
            console.log(err);
            return 'there is an error';
            
        }
    }
    async create(user:user_type):Promise<string>{
        try{console.log(process.env.salt);
            const salt = parseInt(process.env.salt as string);

            const hashedPass = bcrypt.hashSync(user.password as string ,salt);
            const connection = await client.connect();
            const sqlCommand = `INSERT INTO Users (firstName,lastName,password) VALUES($1,$2,$3)`;
            await connection.query(sqlCommand,[user.firstName,user.lastName,hashedPass]);
            return "user is created"
        }catch(err){
            console.log(err);
            return "error in creatin new user"
        }
    }

}