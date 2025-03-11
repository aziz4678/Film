import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = ({ selectedCategory }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const apiKey = 'aebbe945a2b55aac48b2646bce30b705';

  useEffect(() => {
    setLoading(true);
    let apiUrl = '';

    if (selectedCategory === 'Movies') {
      apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    } else if (selectedCategory === 'Series') {
      apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
    } else {
      // Default category, could be 'Home' or any other fallback logic
      apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    }

    axios.get(apiUrl)
      .then(response => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch movies');
        setLoading(false);
      });
  }, [selectedCategory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-lg shadow-md hover:shadow-xl cursor-pointer"
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
  );
};

export default MovieList;
