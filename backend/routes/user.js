import express from 'express'
import { getUserData, isAUthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/user.js';
import userAuth from '../middleswares/userAuth.js';

const userRouter=express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/logout',logout);
userRouter.post('/send-verification-otp',userAuth,sendVerifyOtp);
userRouter.post('/verify-account',userAuth,verifyEmail);
userRouter.post('/check-login',userAuth,isAUthenticated);
userRouter.post('/send-reset-otp',sendResetOtp);
userRouter.post('/reset-password',resetPassword);
userRouter.post('/get-user-data',userAuth,getUserData);

export default userRouter;