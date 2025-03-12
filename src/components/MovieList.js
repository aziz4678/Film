import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../pages/hero';

const MovieList = ({ selectedCategory, searchQuery, onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705';

  useEffect(() => {
    const fetchMovies = () => {
      let apiUrl = '';

      if (searchQuery) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US&page=${currentPage}`;
      } else {
        if (selectedCategory === 'Action') {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&language=en-US&page=${currentPage}`;  // Genre ID for Action
        } else if (selectedCategory === 'Drama') {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&language=en-US&page=${currentPage}`;
        } else if (selectedCategory === 'Horror') {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&language=en-US&page=${currentPage}`;
        } else if (selectedCategory === 'Thriller') {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53&language=en-US&page=${currentPage}`;  // Genre ID for Thriller
        } else if (selectedCategory === 'TV Show') {
          apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;
        } else {
          apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;
        }
      }

      axios.get(apiUrl)
        .then(response => {
          setMovies(response.data.results || []);
          setHeroMovies(response.data.results.slice(0, 5) || []);  
          setLoading(false);
        })
        .catch(error => {
          setError('Failed to fetch movies');
          setLoading(false);
        });
    };

    fetchMovies();
  }, [selectedCategory, searchQuery, currentPage]); 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black">
      {/* Hero Section */}
      {heroMovies.length > 0 && <Hero movies={heroMovies} />}

      {/* Movie List */}
      <div className="container mx-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl cursor-pointer"
            onClick={() => onMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-600">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
