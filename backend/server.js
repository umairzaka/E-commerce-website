import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './Routers/ProductRouter.js';
import userRouter from './Routers/UserRouters.js';
import orderRouter from './Routers/OrderRouter.js';
import uploadRouter from './Routers/uploadRouter.js';

dotenv.config();
 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }))


const port= process.env.PORT || 9000;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
})

    const db = mongoose.connection;

    db.once('open' , ()=> {
        console.log('DB connected')
    })


app.get('/' , (req,res)=> res.status(200).send('server is ready'));

// app.get('/api/products' ,(req,res)=>
//  res.status(200).send(Data.products)
//  )
app.use('/api/uploads', uploadRouter);  
app.use('/api/users' ,userRouter);
app.use('/api/products' ,productRouter);
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use((err,req,res,next) => {
    res.status(500).send({message: err.message})
})

// app.get('/api/products/:id' ,(req,res)=> {
//     const product = Data.products.find( (x) => 
//         x._id === req.params.id
//         )
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message:'Product Not Found' });
//     }
    
// })

app.listen(port , () => console.log(`server runing on http://localhost:${port}`))