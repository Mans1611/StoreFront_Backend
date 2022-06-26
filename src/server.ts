import bodyParser from 'body-parser';
import express from 'express';
import oreders from './routes/orders';
import products from './routes/products';
import users from './routes/users';


const app = express();
const Port = 5000;
app.use(bodyParser.urlencoded())
// routes middleware  
app.use('/products',products);
app.use('/users',users);
app.use('/orders',oreders);

app.get('/',(req,res)=>{
    res.send("hello mansour");
    
})


app.listen(Port,()=>{
    console.log(`You are running on the server http://localhost:${Port}`);    
    
})