import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        orderItem : [
            {
                name:{ type: String, require: true},
                qty:{ type: Number, require: true},
                price:{ type: Number, require: true},
                image:{ type: String, require: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Products',
                    require :true
                }
            }
        ],
        shippingAddress : {
            fullName: {type:String, require :true},
            address: {type:String, require :true},
            city: {type:String, require :true},
            postalCode: {type:String, require :true},
            country: {type:String, require :true},
        },
        paymentMethod : {type: String , require: true},
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
            },
        itemsPrice : {type: Number , require: true},
        shippingPrice : {type: Number , require: true},
        taxPrice : {type: Number , require: true},
        totalPrice : {type: Number , require: true},
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Users',
                require :true
            },
        isPaid : {type:Boolean, require : true},  
        paidAt : {type: Date},  
        isDelivered : {type:Boolean, require : true},  
        deliveredAt : {type: Date},  

    },{
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema)

export default Order