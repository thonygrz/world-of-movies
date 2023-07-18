import Router from 'express-promise-router';
import moviesRouter from '../modules/movies/movies.router';

// Create a new router instance
const mainRouter = Router();

// Define routes
mainRouter.get('/', (req, res) => res.send('Everything nice'));

// Use the moviesRouter for handling movie-related routes
mainRouter.use('/movies', moviesRouter);

export default mainRouter;