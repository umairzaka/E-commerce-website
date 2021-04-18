import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../Data.js';
import Products from '../models/ProductsModel.js';

const productRouter = express.Router();

productRouter.get('/' , expressAsyncHandler(async(req,res) =>  {   //  ... api/products/   for fetch all product data and show on frontend
    const product = await Products.find({}) 
    res.send(product)
}))


productRouter.get('/seed', expressAsyncHandler(async(req,res) => {    // ... api/products/   only for seed API
    //  await Products.deleteMany({}) 
    const createdProducts = await Products.insertMany(data.products)
    res.send({createdProducts})
})) 


productRouter.get('/:id' , expressAsyncHandler (  async (req,res)=> {      // ... api/products/:id    for product detail
    const product = await Products.findById(req.params.id)
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message:'Product Not Found' });
    }
    
}))

export default productRouter
