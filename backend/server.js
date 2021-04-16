import express from 'express'
import Data from './Data.js'

const app = express();
const port= process.env.PORT || 9000;

app.get('/' , (req,res)=> res.status(200).send('server is ready'));

app.get('/api/products' ,(req,res)=>
 res.status(200).send(Data.products)
 )

app.get('/api/products/:id' ,(req,res)=> {
    const product = Data.products.find( (x) => 
        x._id === req.params.id
        )
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message:'Product Not Found' });
    }
    
})

app.listen(port , () => console.log(`server runing on http://localhost:${port}`))