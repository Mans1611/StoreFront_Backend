import exprees,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const tokenVerify = (req:Request,res:Response,next:Function)=>{
   if(req.headers.token === ""){
    res.send("provide a token");
    }else{
        try{
            const verify = jwt.verify(req.headers.token as string , process.env.jwt as string);
            console.log("passed");
            next();
        }catch(err){
            console.log(err);
            res.send("the token is not valid")
        }
    }
   

}


 export default tokenVerify;