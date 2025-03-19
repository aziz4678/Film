import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import Hero from '../components/hero'
import { fetchMoviesByCategory } from '../utils/api'

const MovieList = ({ selectedCategory }) => {
  const [movies, setMovies] = useState([])
  const [heroMovies, setHeroMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [latest, setLatest] = useState([])
  const [indo, setIndo] = useState([])
  const [korea, setKorea] = useState([])
  const [japan, setJapan] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const fetchedMovies = await fetchMoviesByCategory(selectedCategory, currentPage)
        setMovies(fetchedMovies)
        setHeroMovies(fetchedMovies.slice(0, 5))
        setTopRatedMovies(await fetchMoviesByCategory('Top Rated Movies'))
        setUpcomingMovies(await fetchMoviesByCategory('Upcoming'))
        setLatest(await fetchMoviesByCategory('Popular Movies'))
        setIndo(await fetchMoviesByCategory('Indonesia'))
        setKorea(await fetchMoviesByCategory('Korea'))
        setJapan(await fetchMoviesByCategory('Japan'))
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch movies')
        setLoading(false)
      }
    }

    fetchMovies()
  }, [selectedCategory, currentPage])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="bg-black">
      {heroMovies.length > 0 && <Hero movies={heroMovies} />}
      <MovieSection title="Trending Now" movies={movies} />
      <MovieSection title="Popular Movies" movies={latest} />
      <MovieSection title="Top Rated Movies" movies={topRatedMovies} />
      <MovieSection title="Korea" movies={korea} />
      <MovieSection title="Anime" movies={japan} />
      <MovieSection title="Indonesia" movies={indo} />
      <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
    </div>
  )
}

const MovieSection = ({ title, movies }) => {
  const [startIndex, setStartIndex] = useState(0)
  const moviesToShow = movies.slice(startIndex, startIndex + 5)

  const prevMovie = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const nextMovie = () => {
    if (startIndex + 5 < movies.length) {
      setStartIndex((prevIndex) => prevIndex + 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4 text-white">{title}</h1>
      <div className="relative flex items-center">
        {startIndex > 0 && (
          <IconButton onClick={prevMovie} className="absolute left-[-40px] z-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%' }}>
            <ArrowBackIos style={{ color: 'white' }} />
          </IconButton>
        )}
        <div className="flex space-x-4 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
            {moviesToShow.map((movie, index) => (
              <div key={movie.id} className="relative">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    alt={movie.title}
                    className="w-full h-80 object-cover rounded-lg hover:scale-105 transition-all duration-300"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                </Link>
                {title === 'Trending Now' && (
                  <div
                    className="absolute bottom-2 left-2 text-8xl font-bold text-red-800"
                    style={{
                      textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white',
                    }}
                  >
                    {startIndex + index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {startIndex + 5 < movies.length && (
          <IconButton onClick={nextMovie} className="absolute right-[-40px] z-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%' }}>
            <ArrowForwardIos style={{ color: 'white' }} />
          </IconButton>
        )}
      </div>
    </div>
  )
}

export default MovieList
