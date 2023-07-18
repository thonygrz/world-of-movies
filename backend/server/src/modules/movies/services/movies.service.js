import moviesRepository from "../repositories/movies.repository";

// Helper function to create consistent API response objects
const createAPIResponse = (data, status) => ({ data, status });

// Define the moviesService object to encapsulate movie-related business logic
const moviesService = {};

// Fetch movies based on the provided query parameters
moviesService.fetch = async (req, res, next) => {
    try {
        // Check if the 'title' query parameter is provided, if not, return a 403 response
        if (!req.query.title) {
            return createAPIResponse({ message: 'Title required.' }, 403);
        }

        // Fetch movies from the moviesRepository using the 'title' and 'year' query parameters
        const resp = await moviesRepository.fetch(req.query.title, req.query.year);

        // Handle the API response based on the fetched data
        if (resp) {
            // If 'vote_average' query parameter is provided, filter the movies based on the vote average range
            if (req.query.vote_average) {
                resp.results = resp.results.filter(m => m.vote_average > parseInt(req.query.vote_average) && m.vote_average < (parseInt(req.query.vote_average) + 1));
                resp.total_results = resp.results.length;
                resp.total_pages = Math.ceil(resp.total_results / 20);
            }

            // Return the successful API response with the fetched movies
            return createAPIResponse(resp, 200);
        } else {
            // If there was an error fetching movies, return a 500 response
            return createAPIResponse({ message: 'There was an error fetching movies.' }, 500);
        }
    } catch (error) {
        // If there was an error during processing, return a 500 response
        return createAPIResponse({ message: 'There was an error processing your request.' }, 500);
    }
};

// Fetch trending movies
moviesService.fetchTrending = async (req, res, next) => {
    try {
        // Fetch trending movies from the moviesRepository
        const resp = await moviesRepository.fetchTrending();

        // Handle the API response based on the fetched data
        if (resp) {
            // Return the successful API response with the fetched trending movies
            return createAPIResponse(resp, 200);
        } else {
            // If there was an error fetching trending movies, return a 500 response
            return createAPIResponse({ message: 'There was an error fetching trending movies.' }, 500);
        }
    } catch (error) {
        // If there was an error during processing, return a 500 response
        return createAPIResponse({ message: 'There was an error processing your request.' }, 500);
    }
};

// Fetch upcoming movies
moviesService.fetchUpcoming = async (req, res, next) => {
    try {
        // Fetch upcoming movies from the moviesRepository
        const resp = await moviesRepository.fetchUpcoming();

        // Handle the API response based on the fetched data
        if (resp) {
            // Return the successful API response with the fetched upcoming movies
            return createAPIResponse(resp, 200);
        } else {
            // If there was an error fetching upcoming movies, return a 500 response
            return createAPIResponse({ message: 'There was an error fetching upcoming movies.' }, 500);
        }
    } catch (error) {
        // If there was an error during processing, return a 500 response
        return createAPIResponse({ message: 'There was an error processing your request.' }, 500);
    }
};

// Fetch movie details by ID
moviesService.fetchById = async (req, res, next) => {
    try {
        // Fetch movie details from the moviesRepository using the provided ID
        const resp = await moviesRepository.fetchById(req.params.id);

        // Handle the API response based on the fetched data
        if (resp) {
            // Return the successful API response with the fetched movie details
            return createAPIResponse(resp, 200);
        } else {
            // If there was an error fetching movie details, return a 500 response
            return createAPIResponse({ message: 'There was an error fetching the movie.' }, 500);
        }
    } catch (error) {
        // If there was an error during processing, return a 500 response
        return createAPIResponse({ message: 'There was an error processing your request.' }, 500);
    }
};

// Fetch movie credits by ID
moviesService.fetchCreditsById = async (req, res, next) => {
    try {
        // Fetch movie credits from the moviesRepository using the provided ID
        const resp = await moviesRepository.fetchCreditsById(req.params.id);

        // Handle the API response based on the fetched data
        if (resp) {
            // Return the successful API response with the fetched movie credits
            return createAPIResponse(resp, 200);
        } else {
            // If there was an error fetching movie credits, return a 500 response
            return createAPIResponse({ message: 'There was an error fetching movie credits.' }, 500);
        }
    } catch (error) {
        // If there was an error during processing, return a 500 response
        return createAPIResponse({ message: 'There was an error processing your request.' }, 500);
    }
};

export default moviesService;