import axios from 'axios';
import env from './environment';

const baseURL = env.MOVIES_API;
const apiKey = env.API_KEY;
const nodeEnv = env.NODE_ENV;

const api = axios.create({
  baseURL: baseURL,
  params: {
    api_key: apiKey,
  },
});

export async function checkApiConnection() {
  try {
    const response = await api.get('/authentication');
    if (response.data.success) {
      if (nodeEnv !== 'test') {
        console.log('TMDB API connected successfully');
      }
    }
  } catch (error) {
    console.error('Error connecting to TMDB API:', error.message);
  }
}

// Call the checkApiConnection function to test the API connection when this module is imported.
if (nodeEnv !== 'test') {
  checkApiConnection();
}

export default api;