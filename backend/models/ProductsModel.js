import  mongoose  from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {type:String , unique: true, require :  true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: {type:String , require :  true },
    category: {type:String , require :  true },
    brand: {type:String ,require :  true },
    description: {type:String ,require :  true },
    price: {type: Number,require :true },
    rating: {type: Number,require :true },
    countInStock: {type: Number,require :true },
    numReviews: {type: Number,require :true },
},{
    timestamps : true
})

const Products = mongoose.model('Products' , productSchema)

export default Products
