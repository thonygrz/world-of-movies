import moviesRepository from '../modules/movies/repositories/movies.repository';
import api from '../utils/apiTMDB';
import { expect } from '@jest/globals';

jest.mock('../utils/apiTMDB');

const movieSchema = {
  adult: expect.any(Boolean),
  backdrop_path: expect.any(String),
  genre_ids: expect.arrayContaining([expect.any(Number)]),
  id: expect.any(Number),
  original_language: expect.any(String),
  original_title: expect.any(String),
  overview: expect.any(String),
  popularity: expect.any(Number),
  poster_path: expect.any(String),
  release_date: expect.any(String),
  title: expect.any(String),
  video: expect.any(Boolean),
  vote_average: expect.any(Number),
  vote_count: expect.any(Number),
};

describe('moviesRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches movies by title and year', async () => {
    const title = 'avengers';
    const year = '2019';
    const expectedData = {
      page: expect.any(Number),
      results: expect.arrayContaining([expect.objectContaining(movieSchema)]),
      total_pages: expect.any(Number),
      total_results: expect.any(Number),
    };
    api.get.mockResolvedValueOnce({ data: expectedData });

    const result = await moviesRepository.fetch(title, year);

    expect(api.get).toHaveBeenCalledWith('/search/movie', {
      params: { query: title, year: year },
    });
    expect(result).toEqual(expectedData);
  });

  it('fetches trending movies', async () => {
    const expectedData = {
        page: expect.any(Number),
        results: expect.arrayContaining([expect.objectContaining(movieSchema)]),
        total_pages: expect.any(Number),
        total_results: expect.any(Number),
      };
    api.get.mockResolvedValueOnce({ data: expectedData });

    const result = await moviesRepository.fetchTrending();

    expect(api.get).toHaveBeenCalledWith('/trending/movie/day');
    expect(result).toEqual(expectedData);
  });

  it('fetches upcoming movies', async () => {
    const expectedData = {
        dates: {
          maximum: expect.any(String),
          minimum: expect.any(String),
        },
        page: expect.any(Number),
        results: expect.arrayContaining([expect.objectContaining(movieSchema)]),
        total_pages: expect.any(Number),
        total_results: expect.any(Number),
      };
    api.get.mockResolvedValueOnce({ data: expectedData });

    const result = await moviesRepository.fetchUpcoming();

    expect(api.get).toHaveBeenCalledWith('/movie/upcoming');
    expect(result).toEqual(expectedData);
  });

  it('fetches movie by id', async () => {
    const movieId = 597;
    const expectedData = {
        adult: expect.any(Boolean),
        backdrop_path: expect.any(String),
        belongs_to_collection: expect.anything(),
        budget: expect.any(Number),
        genres: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
        homepage: expect.any(String),
        id: expect.any(Number),
        imdb_id: expect.any(String),
        original_language: expect.any(String),
        original_title: expect.any(String),
        overview: expect.any(String),
        popularity: expect.any(Number),
        poster_path: expect.any(String),
        production_companies: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            logo_path: expect.any(String),
            name: expect.any(String),
            origin_country: expect.any(String),
          }),
        ]),
        production_countries: expect.arrayContaining([
          expect.objectContaining({
            iso_3166_1: expect.any(String),
            name: expect.any(String),
          }),
        ]),
        release_date: expect.any(String),
        revenue: expect.any(Number),
        runtime: expect.any(Number),
        spoken_languages: expect.arrayContaining([
          expect.objectContaining({
            english_name: expect.any(String),
            iso_639_1: expect.any(String),
            name: expect.any(String),
          }),
        ]),
        status: expect.any(String),
        tagline: expect.any(String),
        title: expect.any(String),
        video: expect.any(Boolean),
        vote_average: expect.any(Number),
        vote_count: expect.any(Number),
      };
    api.get.mockResolvedValueOnce({ data: expectedData });

    const result = await moviesRepository.fetchById(movieId);

    expect(api.get).toHaveBeenCalledWith(`/movie/${movieId}`);
    expect(result).toEqual(expectedData);
  });

  it('fetches movie credits by id', async () => {
    const movieId = 597;
    const expectedData = {
        id: expect.any(Number),
        cast: expect.arrayContaining([
          {
            adult: expect.any(Boolean),
            gender: expect.any(Number),
            id: expect.any(Number),
            known_for_department: expect.any(String),
            name: expect.any(String),
            original_name: expect.any(String),
            popularity: expect.any(Number),
            profile_path: expect.any(String),
            cast_id: expect.any(Number),
            character: expect.any(String),
            credit_id: expect.any(String),
            order: expect.any(Number),
          },
        ]),
        crew: expect.arrayContaining([
          {
            adult: expect.any(Boolean),
            gender: expect.any(Number),
            id: expect.any(Number),
            known_for_department: expect.any(String),
            name: expect.any(String),
            original_name: expect.any(String),
            popularity: expect.any(Number),
            profile_path: expect.any(String),
            credit_id: expect.any(String),
            department: expect.any(String),
            job: expect.any(String),
          },
        ]),
      };
    api.get.mockResolvedValueOnce({ data: expectedData });

    const result = await moviesRepository.fetchCreditsById(movieId);

    expect(api.get).toHaveBeenCalledWith(`/movie/${movieId}/credits`);
    expect(result).toEqual(expectedData);
  });
});