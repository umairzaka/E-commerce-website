import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../Data.js';
import Products from '../models/ProductsModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/' , expressAsyncHandler(async(req,res) =>  {   //  ... api/products/   for fetch all product data and show on frontend
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};
    const product = await Products.find({ ...sellerFilter });
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

productRouter.post( // api for create product 
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Products({
      name: 'samle name ' + Date.now(),
      seller: req.user._id,
      image: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);

// edit product APi

productRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Products.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);



productRouter.delete( // delete prodoct functionality 
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);


export default productRouter
