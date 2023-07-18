<script setup lang="ts">
// Import necessary functions and types
import { onMounted, ref } from 'vue'
import { useMoviesStore } from '../stores/movies'
import { Movie } from '../types/movies'
import { useDisplay } from 'vuetify';

// Access the moviesStore for fetching trending movies
const moviesStore = useMoviesStore()

// Create a reactive reference for the trending movies list
const trendingList = ref<Movie[]>([])

// Fetch trending movies when the component is mounted
onMounted(async () => {
    // Fetch trending movies from the store
    const response = await moviesStore.fetchTrendingMovies()
    if (response) {
        // If the fetch is successful, update the trendingList with the fetched movies
        trendingList.value = moviesStore.trendingMovies
    }
})
</script>

<template>
    <!-- Trending movies title -->
    <span class="ml-4 py-2">
        <strong class="text-h6 text-grey-lighten-1">Trending</strong>
    </span>

    <!-- Trending movies carousel -->
    <v-carousel
        hide-delimiters
        cycle
        :height="useDisplay().name.value === 'xs' ? 500 : 400"
        hide-delimiter-background
        show-arrows="hover"
    >
        <!-- Render each trending movie in the carousel -->
        <v-carousel-item
            v-for="(item, index) in trendingList"
            :key="index"
            :src="item.backdrop_path"
            :lazy-src="item.backdrop_path"
            aspect-ratio="16/9"
            cover
        >
        </v-carousel-item>
    </v-carousel>
</template>