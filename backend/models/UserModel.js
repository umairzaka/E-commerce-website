import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type:String , require:true},
    email:{type:String, require:true , unique:true},
    password:{type:String,require:true},
    isAdmin: {type:Boolean , default:false , require:true},
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
},
{
    timestamps:true
});

const User = mongoose.model('User', userSchema);
export default User;