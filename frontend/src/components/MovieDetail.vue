<script setup lang="ts">
// Import necessary functions and types
import { ref } from 'vue'
import { useMoviesStore } from '../stores/movies'
import { Movie } from '../types/movies'

// Define the props interface for MovieDetail component
export interface MovieDetailProps {
    selectedMovie: Movie
}

// Define the custom event interface for the component's emits
interface VMovieDetailEmits {
    (e: 'changeDialog'): void
}

// Define the props using the MovieDetailProps interface
const props = defineProps<MovieDetailProps>()

// Define the emits using the VMovieDetailEmits interface
defineEmits<VMovieDetailEmits>()
</script>

<template>
    <v-card color="#181818" class="pb-4">
        <v-card-text>
            <v-container>
                <v-row>
                    <!-- Movie poster column -->
                    <v-col cols="12" sm="6" md="3">
                        <v-img :width="200" cover :src="props.selectedMovie.poster_path"></v-img>
                    </v-col>

                    <!-- Movie information column -->
                    <v-col cols="12" sm="6" md="9">
                        <!-- Movie title and close button row -->
                        <v-row class="ma-0 pt-2">
                            <v-col class="pa-0" cols="11">
                                <span class="text-h5 font-weight-regular text-white"><strong>{{props.selectedMovie.original_title}}</strong></span>
                            </v-col>
                            <v-col class="pa-0" cols="1">
                                <!-- Close button to emit changeDialog event -->
                                <v-btn icon dark size="x-small" variant="text" color="white" @click="$emit('changeDialog')">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                        <!-- Movie release date row -->
                        <v-row class="ma-0">
                            <span class="text-h6 font-weight-light text-white"><strong>{{new Date(props.selectedMovie.release_date ? props.selectedMovie.release_date : '').getFullYear()}}</strong></span>
                        </v-row>

                        <!-- Movie rating row -->
                        <v-row class="ma-0 py-2 font-weight-light text-h6 text-white">
                            <v-icon icon="mdi-star"></v-icon><span class="ml-2">{{props.selectedMovie.vote_average}}</span>
                        </v-row>

                        <!-- Movie overview row -->
                        <v-row class="ma-0 mb-2 font-weight-light text-white">
                            {{props.selectedMovie.overview}}
                        </v-row>

                        <!-- Movie cast row -->
                        <v-row class="ma-0 mb-3">
                            <span class="font-weight-light text-white"><strong>Cast: </strong>{{props.selectedMovie.cast}}</span>
                        </v-row>

                        <!-- Movie genres row -->
                        <v-row class="ma-0 mb-3">
                            <span class="font-weight-light text-white"><strong>Genres: </strong>{{props.selectedMovie.genres}}</span>
                        </v-row>

                        <!-- Movie director row -->
                        <v-row class="ma-0 mb-3">
                            <span class="font-weight-light text-white"><strong>Director: </strong>{{props.selectedMovie.director}}</span>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<style>
</style>    