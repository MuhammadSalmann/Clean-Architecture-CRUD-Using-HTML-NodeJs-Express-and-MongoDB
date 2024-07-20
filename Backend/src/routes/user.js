const express = require('express');
const userRouter = express.Router();
const { getAllUsers, register, login } = require('../controller/userController');
const { auth } = require('../middleware/auth');
// import { register, login } from '../controller/userController';

userRouter.get('/', auth, getAllUsers);
userRouter.post('/signup', register);
userRouter.post('/signin', login);

module.exports = userRouter;