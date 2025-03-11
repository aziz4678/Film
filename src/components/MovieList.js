import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetail from './MovieDetail'; 

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState(null); 

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705'; 

  
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${'apiKey'}&language=en-US`)
      .then(response => {
        setGenres(response.data.genres);
      })
      .catch(error => {
        setError('Failed to fetch genres');
      });
  }, []);

 
  const fetchMovies = (query = '', genre = '', page = 1) => {
    setLoading(true);
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

    if (query) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=${page}`;
    } else if (genre) {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&language=en-US&page=${page}`;
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

  // Menangani pencarian
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset page ke 1 setiap kali pencarian baru
    fetchMovies(searchQuery, selectedGenre, 1);
  };

  // Menangani perubahan genre
  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    setCurrentPage(1); // Reset page ke 1 saat genre berubah
    fetchMovies(searchQuery, genreId, 1);
  };

  // Menangani pagination (halaman berikutnya dan sebelumnya)
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchMovies(searchQuery, selectedGenre, newPage);
  };

  // Ambil film pertama kali ketika komponen dimuat
  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Popular Movies</h1>
      
      {/* Pencarian */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Search for movies..."
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
          Search
        </button>
      </form>

      {/* Dropdown Genre */}
      <div className="mb-4">
        <select
          onChange={handleGenreChange}
          value={selectedGenre}
          className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            onClick={() => setSelectedMovieId(movie.id)} // Set selected movie id
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-110"
            />
            <h2 className="text-xl font-semibold mt-4 text-gray-800">{movie.title}</h2>
            <p className="text-gray-600 mt-2">{movie.release_date}</p>
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

      {/* Movie Detail Modal */}
      {selectedMovieId && (
        <MovieDetail movieId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />
      )}
    </div>
  );
};

export default MovieList;
