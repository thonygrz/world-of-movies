import Router from 'express-promise-router';
import moviesController from '../movies/controllers/movies.controller';

// Create a new router instance
const movieRouter = Router();

// Define routes and corresponding controller functions
movieRouter.get('/', moviesController.fetch);
movieRouter.get('/trending', moviesController.fetchTrending);
movieRouter.get('/:id/credits', moviesController.fetchCreditsById);
movieRouter.get('/:id', moviesController.fetchById);
movieRouter.get('/upcoming', moviesController.fetchUpcoming);

export default movieRouter;