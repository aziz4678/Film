import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegEye } from 'react-icons/fa'; 

const MovieDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705';

  useEffect(() => {
    const fetchMovieDetails = () => {
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

      axios.get(apiUrl)
        .then(response => {
          setMovie(response.data); 
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching movie details');
          setLoading(false);
        });
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  const genres = movie.genre_ids && Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0
    ? movie.genre_ids.join(', ')
    : 'No Genre Available'; 
  const formattedRating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-6">
          <Link to="/" className="text-white">Back to Movie List</Link>
        </button>

        <div className="flex flex-col md:flex-row items-start">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <img
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-lg shadow-md"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          </div>

          <div className="md:ml-6 flex-1">
            {/* Title and Basic Info */}
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-400 text-lg">{movie.release_date} • {movie.runtime} min</p>

            {/* Rating and Popularity */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <FaStar className="text-yellow-500 mr-2" />
                <span>{formattedRating} / 10</span>
              </div>
              <div className="flex items-center">
                <FaRegEye className="text-green-500 mr-2" />
                <span>{movie.popularity}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="mt-4">
              <p className="text-lg font-semibold">Genres:</p>
              <p>{genres}</p>
            </div>

            {/* Additional Info */}
            <div className="mt-4">
              <p><span className="font-semibold">Original Language: </span>{movie.original_language}</p>
              <p><span className="font-semibold">Original Title: </span>{movie.original_title}</p>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <p className="text-xl font-semibold mb-2">Overview</p>
              <p className="text-gray-300">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
