import express from "express";
const oreders = express.Router();


oreders.get('/',(req:express.Request,res:express.Response)=>{
    res.send("orders ");
})

export default oreders;