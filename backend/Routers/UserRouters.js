import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import data from '../Data.js';
import User from '../models/UserModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.get('/seed' , expressAsyncHandler( async (req, res) => {
    // await User.deleteMany({})
    const CrestedUser = await User.insertMany(data.users)
    res.send(CrestedUser)
}))


userRouter.post('/signin', expressAsyncHandler( async(req,res) => {
    const user = await User.findOne({email : req.body.email})

    if (user) {
        if (bcrypt.compareSync(req.body.password , user.password)) {
            res.send({
                _id: user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                isSeller: user.isSeller,
                token:generateToken(user)
            });
            return;
        }
       
    } 
        res.status(401).send({message: 'Some of your Info is not corrent ! Please try again'})
    
}))

userRouter.post('/register' , expressAsyncHandler( async(req,res)=> {
        const user = new User({
            name: req.body.name,
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password , 8)
        })
        const CreatedUser = await user.save();

            res.send({
                _id: CreatedUser._id,
                name:CreatedUser.name,
                email:CreatedUser.email,
                isAdmin:CreatedUser.isAdmin,
                isSeller: user.isSeller,
                token:generateToken(CreatedUser)
            })
        

}))

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get( // get user for admin
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete( // delete user from users list admin funcationality
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async(req,res) => {
    const userId = req.params.id
    const user = await User.findById(userId)

    if(user) {
      if(user.email === 'admin@example.com'){
        res.status(404).send({message:'admin should not b deleted'})
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    }else{
      res.status(404).send({ message: 'User Not Found' });
    }

  })
)

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async(req,res) =>{
      const userId = req.params.id

      const user = await User.findById(userId)

      if (user) {
        user.name = req.body.name || user.name,
        user.email = req.body.email || user.email,
        user.isAdmin = req.body.isAdmin === user.isAdmin ? user.isAdmin : req.body.isAdmin;
        user.isSeller = req.body.isSeller === user.isSeller ? user.isSeller : req.body.isSeller;
        const updatedUser = await user.save();
         res.send({ message: 'User Updated', user: updatedUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
  })
)


export default userRouter