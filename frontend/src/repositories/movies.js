import axios from 'axios';

const baseUrl = process.env.VITE_API_BASE_URL;

export async function fetchTrending() {
  let resp = await axios.get(`${baseUrl}/movies/trending`);
  return resp.data;
}

export async function fetchUpcoming() {
  let resp = await axios.get(`${baseUrl}/movies/upcoming`);
  return resp.data;
}

export async function fetchMovies(title, year, vote_average) {
  let resp = await axios.get(`${baseUrl}/movies`, {
    params: {
      title: title ? title : '',
      year: year ? year : '',
      vote_average: vote_average ? vote_average : ''
    }
  });

  if (resp.data.results) {
    resp.data.results = resp.data.results.filter(m => m.backdrop_path);
  }

  return resp.data;
}

export async function fetchDetails(id) {
  let genres;
  let resp = await axios.get(`${baseUrl}/movies/${id}`);

  if (resp && resp.data) {
    genres = resp.data.genres.map(g => g.name);
    resp.data.genres = genres.join(' • ');
  }

  return resp.data;
}

export async function fetchCredits(id) {
  let cast;
  let director;
  let resp = await axios.get(`${baseUrl}/movies/${id}/credits`);

  if (resp && resp.data) {
    cast = resp.data.cast.map(c => c.name);
    director = resp.data.crew.find(c => c.job === 'Director');

    resp.data.cast = cast.join(', ');
    resp.data.director = director.name;
  }

  return resp.data;
}