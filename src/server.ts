import bodyParser from 'body-parser';
import express from 'express';
import orders from './routes/orders';
import products from './routes/products';
import users from './routes/users';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const Port = process.env.PORT;
app.use(bodyParser.urlencoded());
// routes middleware  
app.use('/products',products);
app.use('/users',users);
app.use('/orders',orders);

app.get('/',(req,res)=>{
    res.send("hello mansour");
    
})


app.listen(Port,()=>{
    console.log(`You are running on the server http://localhost:${Port}`);        
})
export default app;