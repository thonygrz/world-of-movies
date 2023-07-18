import moviesService from "../services/movies.service";

const moviesController = {};

// Fetch all movies
moviesController.fetch = async (req, res, next) => {
    const resp = await moviesService.fetch(req, res, next);
    res.status(resp.status).json(resp.data);
};

// Fetch trending movies
moviesController.fetchTrending = async (req, res, next) => {
    const resp = await moviesService.fetchTrending(req, res, next);
    res.status(resp.status).json(resp.data);
};

// Fetch upcoming movies
moviesController.fetchUpcoming = async (req, res, next) => {
    const resp = await moviesService.fetchUpcoming(req, res, next);
    res.status(resp.status).json(resp.data);
};

// Fetch movie by ID
moviesController.fetchById = async (req, res, next) => {
    const resp = await moviesService.fetchById(req, res, next);
    res.status(resp.status).json(resp.data);
};

// Fetch credits by movie ID
moviesController.fetchCreditsById = async (req, res, next) => {
    const resp = await moviesService.fetchCreditsById(req, res, next);
    res.status(resp.status).json(resp.data);
};

// Fetch movie by name
moviesController.fetchByName = async (req, res, next) => {
    const resp = await moviesService.fetchByName(req, res, next);
    res.status(resp.status).json(resp.data);
};

export default moviesController;