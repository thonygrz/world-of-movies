<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import TrendingCarousel from '../components/TrendingCarousel.vue';
import UpcomingCarousel from '../components/UpcomingCarousel.vue';
import MoviesList from '../components/MoviesList.vue';
import SearchBar from '../components/SearchBar.vue';
import { useDisplay } from 'vuetify';

// Reactive variables
const clearSearchValues = ref(true); // Indicates whether to clear search values in the child component.
const tab = ref<'home' | 'list'>('home'); // Represents the current active tab.

// Computed property to determine the image source based on the current display breakpoint.
const getImageSrc = computed(() => {
  const breakpoint = useDisplay().name;
  switch (breakpoint.value) {
    case 'xs':
      return 'src/assets/world-of-movies-logo-icono.png';
    case 'sm':
    case 'md':
      return 'src/assets/world-of-movies-logo-transparente-blue.png';
    default:
      return 'src/assets/world-of-movies-logo-transparente-blue.png';
  }
});

// Function to change the active tab when the parent or child component triggers a tab change.
function changeTab(comp: 'parent' | 'child') {
  tab.value = comp === 'parent' ? 'home' : 'list';
}

// Watcher to handle changes in the active tab and update the clearSearchValues accordingly.
watch(tab, (value) => {
  clearSearchValues.value = value === 'home';
});
</script>

<template>
  <v-app id="inspire">
    <v-app-bar density="compact">
      <v-toolbar-title>
        <v-img
          style="cursor: pointer;"
          :width="`${useDisplay().name.value === 'xs' ? 40 : 200}px`"
          @click="changeTab('parent')"
          :src="getImageSrc"
        ></v-img>
      </v-toolbar-title>

      <SearchBar :tab="tab" :clear-search-values="clearSearchValues" @change-tab="changeTab" />
    </v-app-bar>

    <v-main style="background-color: #141414;">
      <v-container fluid v-if="tab === 'home'">
        <!-- The TrendingCarousel and UpcomingCarousel components are displayed when the 'home' tab is active. -->
        <v-row>
          <TrendingCarousel />
        </v-row>
        <v-row>
          <UpcomingCarousel />
        </v-row>
      </v-container>
      <v-container fluid v-if="tab === 'list'">
        <!-- The MoviesList component is displayed when the 'list' tab is active. -->
        <v-row class="mt-2 text-grey-lighten-1">
          <MoviesList />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>