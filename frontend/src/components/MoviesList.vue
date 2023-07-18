<script setup lang="ts">
// Import necessary functions and types
import { ref } from 'vue'
import { useMoviesStore } from '../stores/movies'
import { Movie } from '../types/movies'
import MovieDetail from './MovieDetail.vue';
import { useDisplay } from 'vuetify';

// Create a reactive reference for the movies store
const moviesStore = useMoviesStore()

// Create a reactive reference for the selectedMovie state with default values
const selectedMovie = ref<Movie>({
    id: 0,
    original_title: "",
    backdrop_path: "",
    poster_path: "",
    release_date: "",
    overview: "",
    vote_average: 0,
    genres: "",
    cast: "",
    director: "",
})

// Create a reactive reference for the dialog state
const dialog = ref(false)

// Function to select a movie and fetch its details and credits
async function selectMovie(item: Movie) {
    await moviesStore.fetchDetailsMovie(item.id)
    await moviesStore.fetchCreditsMovie(item.id)

    // Update the selectedMovie with the details and credits
    selectedMovie.value = {
        ...item,
        genres: moviesStore.detailMovie.genres,
        cast: moviesStore.creditsMovie.cast,
        director: moviesStore.creditsMovie.director
    }
}
</script>

<template>
    <!-- Show a message when no movies are found -->
    <strong v-if="moviesStore.filteredMovies.length === 0" class="text-grey-lighten-1 mt-4 ml-4">Search movies...</strong>
    <v-col
    v-for="item in moviesStore.filteredMovies"
    :key="item.id"
    cols="12"
    sm="4"
    lg="3"
    >
    <!-- Render movie cards for medium and larger screens -->
    <div v-if="useDisplay().mdAndUp.value">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          class="mx-auto"
          color="grey-lighten-4"
          max-width="500"
          v-bind="props"
        >
          <v-img
            :aspect-ratio="16/9"
            cover
            :src="item.backdrop_path"
          >
            <v-expand-transition>
              <div
                v-if="isHovering"
                class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal text-h2"
                style="height: 100%; overflow: hidden;"
              >
                  <v-card-text>
                      <!-- Show movie details when hovering over the card -->
                      <div class="text-h5 font-weight-regular text-white mb-1 mt-3">
                          {{ item.original_title }}
                      </div>

                      <div class="d-flex font-weight-light text-grey text-h6 mb-1">
                          <strong>{{ new Date(item.release_date ? item.release_date : '').getFullYear() }}</strong>
                      </div>

                      <div class="font-weight-light text-h7 mb-3">
                          <v-icon icon="mdi-star"></v-icon> {{ item.vote_average }}
                      </div>

                      <!-- Show a button to view more details -->
                      <v-dialog
                          v-model="dialog"
                          width="1024"
                      >
                          <template v-slot:activator="{ props }">
                              <v-btn
                              variant="text"
                              color="primary"
                              v-bind="props"
                              size="medium"
                              @click="selectMovie(item)"
                              >
                              More
                              </v-btn>
                          </template>
                          <MovieDetail
                          :selected-movie="selectedMovie"
                          @change-dialog="dialog = !dialog"
                          />
                      </v-dialog>
                  </v-card-text>
              </div>
            </v-expand-transition>
          </v-img>
          
        </v-card>
      </v-hover>
    </div>
    
    <!-- Render movie cards for small and extra-small screens -->
    <div justify="center" v-if="useDisplay().xs.value || useDisplay().sm.value">
      <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ props }">
          <v-img
            :aspect-ratio="16/9"
            cover
            :src="item.backdrop_path"
            @click="selectMovie(item)"
            v-bind="props"
          ></v-img>
        </template>
        <MovieDetail
        :selected-movie="selectedMovie"
        @change-dialog="dialog = !dialog"
        />
      </v-dialog>
    </div>
    </v-col>
</template>

<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
  }
</style>