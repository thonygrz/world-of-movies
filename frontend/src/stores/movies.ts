import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchTrending, fetchUpcoming, fetchMovies, fetchDetails, fetchCredits } from '../repositories/movies'
import { Movie } from '../types/movies'

export const useMoviesStore = defineStore('movies', () => {
  const trendingMovies = ref<Movie[]>([])
  const upcomingMovies = ref<Movie[]>([])
  const filteredMovies = ref<Movie[]>([])
  const detailMovie = ref<Movie>({})
  const creditsMovie = ref<Movie>({})
  const title = ref<string>('')
  const date = ref<string>('')
  const vote_average = ref<number>(0)

  async function fetchTrendingMovies() {
    let resp = await fetchTrending()
    if (resp) {
      resp.results.forEach(m => {
        m.backdrop_path = 'https://www.themoviedb.org/t/p/original' + m.backdrop_path
        m.poster_path = 'https://www.themoviedb.org/t/p/original' + m.poster_path
      });
      trendingMovies.value = resp.results
      return true
    } else {
      return false
    }
  }

  async function fetchUpcomingMovies() {
    let resp = await fetchUpcoming()
    if (resp) {
      resp.results.forEach(m => {
        m.backdrop_path = 'https://www.themoviedb.org/t/p/original' + m.backdrop_path
        m.poster_path = 'https://www.themoviedb.org/t/p/original' + m.poster_path
      });
      upcomingMovies.value = resp.results
      return true
    } else {
      return false
    }
  }

  async function fetchFilteredMovies(title: string, year?: string, vote_average?: number) {
    let resp = await fetchMovies(title, year, vote_average)
    if (resp) {
      resp.results.forEach(m => {
        m.backdrop_path = 'https://www.themoviedb.org/t/p/original' + m.backdrop_path
        m.poster_path = 'https://www.themoviedb.org/t/p/original' + m.poster_path
      });
      filteredMovies.value = resp.results
      return true
    } else {
      return false
    }
  }

  async function fetchDetailsMovie(id: number) {
    let resp = await fetchDetails(id)
    if (resp) {
      resp.backdrop_path = 'https://www.themoviedb.org/t/p/original' + resp.backdrop_path
      resp.poster_path = 'https://www.themoviedb.org/t/p/original' + resp.poster_path
      detailMovie.value = resp
      return true
    } else {
      return false
    }
  }

  async function fetchCreditsMovie(id: number) {
    let resp = await fetchCredits(id)
    if (resp) {
      resp.backdrop_path = 'https://www.themoviedb.org/t/p/original' + resp.backdrop_path
      resp.poster_path = 'https://www.themoviedb.org/t/p/original' + resp.poster_path
      creditsMovie.value = resp
      return true
    } else {
      return false
    }
  }

  async function setTitle(newTitle: string) {
    title.value = newTitle
    if (newTitle === '') {
      filteredMovies.value = []
    } else {
      await fetchFilteredMovies(newTitle)
    }
    return true
  }

  async function setDate(newDate: string) {
    date.value = newDate
    if (newDate !== '') {
      await fetchFilteredMovies(title.value,newDate)
    } 
    return true
  }

  async function setVoteAverage(newVoteAverage: number) {
    vote_average.value = newVoteAverage
    if (newVoteAverage !== null) {
      await fetchFilteredMovies(title.value,date.value,newVoteAverage)
    } 
    return true
  }

  return { title, date, vote_average, trendingMovies, upcomingMovies, filteredMovies, detailMovie, creditsMovie, fetchTrendingMovies, fetchUpcomingMovies, fetchFilteredMovies, fetchDetailsMovie, fetchCreditsMovie, setTitle, setDate, setVoteAverage }
})