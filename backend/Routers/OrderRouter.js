import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post('/' , isAuth, expressAsyncHandler(async(req,res)=> {
    if (req.body.cartItem.length === 0 ) {
        res.status(400).send({message: 'cart is emapty'})
    } else {
        const order = new Order({
            orderItem:req.body.orderItem,
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.totalPrice,
            user:req.user._id,
        })
        const createdOrder = await order.save();
        res.status(201).send({message:'New Order Created' , order:createdOrder})
    }


})) 

orderRouter.get('/:id' , isAuth , expressAsyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        res.send(order)
    } else {
        res.send({message:'order Not Founf'}).status(404)
    }
}))

export default orderRouter