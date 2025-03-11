import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = ({ selectedCategory }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705';

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
      .then(response => {
        setGenres(response.data.genres);
      })
      .catch(error => {
        setError('Failed to fetch genres');
      });
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [selectedCategory]);

  const fetchMovies = (category = '', page = 1) => {
    setLoading(true);
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

    // Change URL based on category
    if (category === 'Movies') {
      apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    } else if (category === 'Drama') {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&language=en-US&page=${page}`;
    } else if (category === 'Horor') {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&language=en-US&page=${page}`;
    } else if (category === 'TV Movie') {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10770&language=en-US&page=${page}`;
    } else if (category === 'TV Show') {
      apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`;
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
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchMovies(selectedCategory, newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">{selectedCategory} </h1>

      {/* Daftar Film */}
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
