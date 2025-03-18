import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegEye } from 'react-icons/fa';
import ReactPlayer from 'react-player';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovie(response.data);
      } catch (error) {
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        const trailerKey = trailerResponse.data.results.find(
          (video) => video.type === 'Trailer'
        );
        setTrailer(trailerKey ? trailerKey.key : null);
      } catch (error) {
        console.error('Error fetching trailer', error);
      }
    };

    fetchMovieDetails();
    fetchMovieTrailer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) return <div className="text-white text-center mt-10">{error}</div>;

  const genres = movie.genres && movie.genres.length > 0
    ? movie.genres.map((genre) => genre.name).join(', ')
    : 'No Genre Available';

  const formattedRating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div
      className="relative min-h-screen bg-black text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 max-w-5xl mx-auto p-6 flex flex-col items-center">
        <div className="w-full flex justify-start mb-6">
          <Link
            to="/"
            className="bg-black bg-opacity-60 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-opacity-80 transition-all duration-300"
          >
            Back to Movie List
          </Link>
        </div>
        <div className="mt-6 w-full bg-black bg-opacity-80 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start">
          {/* Movie Poster */}
          <img
            alt={movie.title}
            className="w-full md:w-64 h-auto object-cover rounded-lg shadow-md mb-6 md:mb-0"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />

          {/* Movie Details */}
          <div className="md:ml-6 flex-1">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-400 text-base md:text-lg">{movie.release_date} • {movie.runtime} min</p>
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

            {/* Movie Genres */}
            <div className="mt-4">
              <p className="text-lg font-semibold">Genres:</p>
              <p>{genres}</p>
            </div>

            {/* Additional Movie Info */}
            <div className="mt-4">
              <p><span className="font-semibold">Original Language: </span>{movie.original_language}</p>
              <p><span className="font-semibold">Original Title: </span>{movie.original_title}</p>
            </div>

            {/* Movie Overview */}
            <div className="mt-6">
              <p className="text-xl font-semibold mb-2">Overview</p>
              <p className="text-gray-300">{movie.overview}</p>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        {trailer && (
          <div className="w-full flex flex-col items-start mt-6">
            <p className="text-xl font-semibold mb-2 text-white">Watch Trailer</p>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              className="react-player"
              width="100%"
              height="500px"
              controls={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
