<script setup lang="ts">
    // Import necessary functions and types
    import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
    import { useMoviesStore } from '../stores/movies'
    import { useDisplay } from 'vuetify'

    // Access the moviesStore for handling movie search
    const moviesStore = useMoviesStore()

    // Access the useDisplay API for handling sizing behavior
    const displayAPI = useDisplay()

    // Create reactive references for search inputs and breakpoint name
    const movieTitle = ref('')
    const movieDate = ref('')
    const movieVoteAverage = ref('')
    const breakpointName = ref(displayAPI.name.value)

    // Define props and emit events for communication with parent component
    export interface SearchBarProps {
        tab: string
        clearSearchValues: boolean
    }

    interface VSearchBarEmits {
        (e: 'changeTab', s: 'parent' | 'child'): void
    }

    // Set default props values and define emit functions
    const props = withDefaults(defineProps<SearchBarProps>(), {
        tab: '',
        clearSearchValues: false
    })

    defineEmits<VSearchBarEmits>()

    // Watch for changes in clearSearchValues and update search values accordingly
    watch(() => props.clearSearchValues, async (value) => {
        if (value === true) {
            movieTitle.value = ''
            await moviesStore.setTitle('')
            movieDate.value = ''
            await moviesStore.setDate('')
            movieVoteAverage.value = ''
            await moviesStore.setVoteAverage(0)
        }
    })

    // Watch for changes in movieTitle and update the search title in the store
    watch(movieTitle, async (value) => {
        await moviesStore.setTitle(value)
    })

    // Watch for changes in movieDate and update the search date in the store
    watch(movieDate, async (value) => {
        await moviesStore.setDate(value)
    })

    // Watch for changes in movieVoteAverage and update the search vote average in the store
    watch(movieVoteAverage, async (value) => {
        await moviesStore.setVoteAverage(parseInt(value))
    })

    // Update breakpointName when the window size changes
    const handleResize = () => {
        breakpointName.value = displayAPI.name.value
    }

    onMounted(() => {
        window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize)
    })
</script>

<template>
    <v-row :style="{ maxWidth: props.tab === 'list' ? (breakpointName === 'xs' || breakpointName === 'sm'? '90%' : '70%') : '70%' }">
        <!-- Column for search movie text field -->
        <v-col :cols="props.tab === 'list' ? (breakpointName === 'xs' ? 6 : 10) : 10" :md="props.tab === 'list' ? 6 : 11">
            <v-text-field
                :class="props.tab === 'home' ? 'mr-sm-8' : ''"
                v-model="movieTitle"
                append-icon="mdi-magnify"
                label="Search a movie"
                single-line
                hide-details
                @click="$emit('changeTab','child')"
            ></v-text-field>
        </v-col>

        <!-- Columns for search by date and vote average select inputs -->
        <v-col cols="1" md="2" v-if="props.tab === 'list'" style="max-height: 45px; min-width: 25%;" class="d-flex justify-center">
            <v-select
                v-model="movieDate"
                label="Date"
                density="compact"
                :items="[
                    '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014',
                    '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004',
                    '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994',
                    '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984',
                    '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974',
                    '1973', '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964',
                    '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', '1954',
                    '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', '1945', '1944',
                    '1943', '1942', '1941', '1940', '1939', '1938', '1937', '1936', '1935', '1934',
                    '1933', '1932', '1931', '1930', '1929', '1928', '1927', '1926', '1925', '1924',
                    '1923', '1922', '1921', '1920', '1919', '1918', '1917', '1916', '1915', '1914',
                    '1913', '1912', '1911', '1910', '1909', '1908', '1907', '1906', '1905', '1904',
                    '1903', '1902', '1901', '1900'
                ]"
            ></v-select>
        </v-col>

        <v-col cols="1" md="2" v-if="props.tab === 'list'" style="max-height: 45px; min-width: 25%;" class="d-flex justify-center">
            <v-select
                v-model="movieVoteAverage"
                label="Vote"
                density="compact"
                :items="[1,2,3,4,5,6,7,8,9,10]"
            ></v-select>
        </v-col>
    </v-row>
</template>