import axios from 'axios'

const apiKey = 'aebbe945a2b55aac48b2646bce30b705'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: apiKey,
        language: 'en-US',
    },
})

export const fetchMovieDetails = async (id) => {
    try {
        const response = await api.get(`movie/${id}`)
        return response.data
    } catch (error) {
        throw new Error('Error fetching movie details')
    }
}

export const fetchMovieTrailer = async (id) => {
    try {
        const response = await api.get(`movie/${id}/videos`)
        const trailer = response.data.results.find((video) => video.type === 'Trailer')
        return trailer ? trailer.key : null
    } catch (error) {
        throw new Error('Error fetching trailer')
    }
}

export const fetchMoviesByCategory = async (category, page = 1) => {
    let url = `trending/movie/day?page=${page}`

    if (category === 'Popular Movies') {
        url = `movie/popular?page=1`
    } else if (category === 'Top Rated Movies') {
        url = `movie/top_rated?page=1`
    } else if (category === 'Indonesia') {
        url = `discover/movie?language=id-ID&with_original_language=id&page=1&sort_by=popularity.desc`
    } else if (category === 'Korea') {
        url = `discover/movie?language=ko-KR&with_original_language=ko&page=1&sort_by=popularity.desc`
    } else if (category === 'Japan') {
        url = `discover/movie?language=ja-JP&with_genres=16&with_original_language=ja&page=1&sort_by=popularity.desc`
    } else if (category === 'Upcoming') {
        url = `movie/upcoming?page=1`
    } else if (category === 'Action') {
        url = `discover/movie?with_genres=28&page=${page}`
    } else if (category === 'Drama') {
        url = `discover/movie?with_genres=18&page=${page}`
    } else if (category === 'Horror') {
        url = `discover/movie?with_genres=27&page=${page}`
    } else if (category === 'Thriller') {
        url = `discover/movie?with_genres=53&page=${page}`
    }

    try {
        const response = await api.get(url)
        return response.data.results
    } catch (error) {
        throw new Error('Failed to fetch movies')
    }
}

export const searchMovies = async (query) => {
    if (!query) return []
    try {
        const response = await api.get('search/movie', { params: { query } })
        return response.data.results
    } catch (error) {
        throw new Error('Error searching movies')
    }
}
