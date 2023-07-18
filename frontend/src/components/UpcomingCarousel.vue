<script setup lang="ts">
// Import necessary functions and types
import { onMounted, ref } from 'vue'
import { useMoviesStore } from '../stores/movies'
import { Movie } from '../types/movies'

// Access the moviesStore for fetching upcoming movies
const moviesStore = useMoviesStore()

// Create a reactive reference for the upcoming movies list
const upcomingList = ref<Movie[]>([])

// Fetch upcoming movies when the component is mounted
onMounted(async () => {
    // Fetch upcoming movies from the store
    const response = await moviesStore.fetchUpcomingMovies()
    if (response) {
        // If the fetch is successful, update the upcomingList with the fetched movies
        upcomingList.value = moviesStore.upcomingMovies
    }
})
</script>

<template>
    <!-- Upcoming movies title -->
    <span class="ml-4 my-2">
        <strong class="text-h6 text-grey-lighten-1">Upcoming</strong>
    </span>

    <!-- Upcoming movies carousel -->
    <v-sheet class="mx-auto bg-dark" max-width="100%">
        <!-- Use Slide Group to display upcoming movies -->
        <v-slide-group class="py-0" selected-class="bg-primary">
            <!-- Render each upcoming movie in the slide group -->
            <v-slide-group-item
                v-for="(item, index) in upcomingList"
                :key="index"
                v-slot="{ isSelected, toggle, selectedClass }"
            >
                <v-card
                    color="grey-lighten-1"
                    :class="['mx-4 my-1', selectedClass]"
                    width="100"
                    @click="toggle"
                >
                    <!-- Display the movie poster using v-img -->
                    <v-img
                        :width="100"
                        cover
                        :src="item.poster_path"
                    ></v-img>
                </v-card>
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>
</template>