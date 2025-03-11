import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetail = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705'; 

  useEffect(() => {
    const fetchMovieDetails = () => {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

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
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-4/5 md:w-3/4 lg:w-1/2">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-96 object-cover rounded-lg mt-4"
        />
        <p className="mt-4">{movie.overview}</p>
        <p className="mt-2">Release Date: {movie.release_date}</p>
        <p className="mt-2">Rating: {movie.vote_average}</p>
        <p className="mt-2">Duration: {movie.runtime} minutes</p>
      </div>
    </div>
  );
};

export default MovieDetail;
