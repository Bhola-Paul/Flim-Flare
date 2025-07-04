import express from 'express'
import { createBooking, getOccupiedSeats } from '../controllers/booking.js'
import userAuth from '../middleswares/userAuth.js';

const bookingRouter=express.Router();

bookingRouter.post('/create',userAuth,createBooking);
bookingRouter.get('/seats/:showId',userAuth,getOccupiedSeats);

export default bookingRouter;