import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../Data.js';
import User from '../models/UserModel.js';

const userRouter = express.Router();

userRouter.get('/seed' , expressAsyncHandler( async (req, res) => {
    await User.deleteMany({})
    const CrestedUser = await User.insertMany(data.users)
    res.send(CrestedUser)
}))

export default userRouter