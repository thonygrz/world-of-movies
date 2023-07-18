import api from '../../../utils/apiTMDB';

// Create the moviesRepository object to encapsulate movie data retrieval logic
const moviesRepository = {};

// Fetch movies based on the provided title and year
moviesRepository.fetch = async (title, year) => {
    try {
        // Make an API request to search for movies using the provided title and year as query parameters
        const resp = await api.get('/search/movie', {
            params: {
                query: title || '', // If title is provided, use it as the query parameter, otherwise use an empty string
                year: year || ''    // If year is provided, use it as the query parameter, otherwise use an empty string
            }
        });
        return resp.data;
    } catch (error) {
        console.error('error:', error);
        throw new Error('There was an error fetching movies.');
    }
};

// Fetch trending movies
moviesRepository.fetchTrending = async () => {
    try {
        // Make an API request to get trending movies for the day
        const resp = await api.get('/trending/movie/day');
        return resp.data;
    } catch (error) {
        console.error('error:', error);
        throw new Error('There was an error fetching trending movies.');
    }
};

// Fetch upcoming movies
moviesRepository.fetchUpcoming = async () => {
    try {
        // Make an API request to get upcoming movies
        const resp = await api.get('/movie/upcoming');
        return resp.data;
    } catch (error) {
        console.error('error:', error);
        throw new Error('There was an error fetching upcoming movies.');
    }
};

// Fetch movie details by ID
moviesRepository.fetchById = async (id) => {
    try {
        // Make an API request to get movie details by ID
        const resp = await api.get(`/movie/${id}`);
        return resp.data;
    } catch (error) {
        console.error('error:', error);
        throw new Error('There was an error fetching movie details.');
    }
};

// Fetch movie credits by ID
moviesRepository.fetchCreditsById = async (id) => {
    try {
        // Make an API request to get movie credits by ID
        const resp = await api.get(`/movie/${id}/credits`);
        return resp.data;
    } catch (error) {
        console.error('error:', error);
        throw new Error('There was an error fetching movie credits.');
    }
};

export default moviesRepository;