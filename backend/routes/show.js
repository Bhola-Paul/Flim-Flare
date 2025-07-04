import express from 'express'
import { addShow, getNowPlayingMovies, getShow, getShows } from '../controllers/show.js';
import adminAuth from '../middleswares/adminAuth.js';

const showRouter=express.Router();

showRouter.get('/now-playing',adminAuth,getNowPlayingMovies);
showRouter.post('/add',adminAuth,addShow);
showRouter.get('/all',getShows);
showRouter.get('/:movieId',getShow);

export default showRouter;