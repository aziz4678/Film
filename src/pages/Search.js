import React, { useState, useEffect } from 'react'
import { FaRegSadCry } from 'react-icons/fa'
import { searchMovies } from '../utils/api'
import { Link } from 'react-router-dom'
const Search = ({ searchQuery }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch movies')
        setLoading(false)
      }
    }

    fetchMovies()
  }, [searchQuery])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-white mt-10">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-white mb-8"> Search Results for "{searchQuery}" </h1>
        {movies.length === 0 ? (
          <div className="text-center text-white mt-16">
            <FaRegSadCry className="mx-auto text-6xl text-red-500 mb-4" />
            <h2 className="text-4xl font-semibold">No Results Found</h2>
            <p className="text-lg mt-4">Try searching with different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
            {movies.map((movie) => (
              <div key={movie.id} className="relative w-full">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    alt={movie.title}
                    className="w-full h-80 object-cover rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
