const express = require('express');
const userRouter = express.Router();
const { register, login } = require('../controller/userController');
const { register2, login2 } = require('../controller/userController');
// import { register, login } from '../controller/userController';

userRouter.post('/signup', register);
userRouter.post('/signin', login);

userRouter.post('/signup2', register2);
userRouter.post('/signin2', login2);

module.exports = userRouter;