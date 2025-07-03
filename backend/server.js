import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import connectDB from './configs/db.js';
// import { clerkMiddleware } from '@clerk/express'
import  cookieParser from 'cookie-parser'
import userRouter from './routes/user.js';
import showRouter from './routes/show.js';
import bookingRouter from './routes/booking.js';


const app=express();
const port=3000;
const allowedOrigins=['http://localhost:5173']

await connectDB();

//middleware
app.use(express.json());
app.use(cors({
    origin:allowedOrigins,
    credentials:true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(clerkMiddleware())



//api routes
app.get('/',(req,res)=>res.send('Server is Live!'));
app.use('/api/user',userRouter);
app.use('/api/show',showRouter);
app.use('/api/booking',bookingRouter);

app.listen(port,()=>console.log('Server started at',port));
