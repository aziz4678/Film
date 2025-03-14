import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Hero from '../pages/hero';

const MovieList = ({ selectedCategory }) => {
  const [movies, setMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMovies, setCurrentMovies] = useState([]);

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705';

  useEffect(() => {
    const fetchMovies = () => {
      let apiUrl = '';
      if (selectedCategory === 'Action') {
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&language=en-US&page=${currentPage}`;
      } else if (selectedCategory === 'Drama') {
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&language=en-US&page=${currentPage}`;
      } else if (selectedCategory === 'Horror') {
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&language=en-US&page=${currentPage}`;
      } else if (selectedCategory === 'Thriller') {
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53&language=en-US&page=${currentPage}`;
      } else if (selectedCategory === 'TV Show') {
        apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;
      } else {
        apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;
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
  }, [selectedCategory, currentPage]);

  useEffect(() => {
    const indexOfLastMovie = currentPage * 5;
    const indexOfFirstMovie = indexOfLastMovie - 5;
    setCurrentMovies(movies.slice(indexOfFirstMovie, indexOfLastMovie));
  }, [movies, currentPage]);

  const prevMovie = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const nextMovie = () => {
    if (currentMovies.length === 5) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const showPrevButton = currentPage > 1;
  const showNextButton = currentMovies.length === 5 && movies.length > currentPage * 5;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black">
      {heroMovies.length > 0 && <Hero movies={heroMovies} />}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-4 text-white">Sedang Tren Sekarang</h1>
        <div className="relative flex justify-start space-x-4">
          {currentMovies.map((movie, index) => (
            <div key={movie.id} className="relative w-60">
              <Link to={`/movie/${movie.id}`}>
                <img
                  alt={movie.title}
                  className="w-full h-80 object-cover rounded-lg hover:scale-105 transition-all duration-300"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              </Link>
              <div className="absolute bottom-2 left-2 text-8xl font-bold text-red-800">
                {index + 1 + (currentPage - 1) * 5}
              </div>

              {index === 0 && showPrevButton && (
                <div className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 z-10">
                  <IconButton
                    onClick={prevMovie}
                    color="primary"
                    aria-label="previous movie"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '50%',
                    }}
                  >
                    <ArrowBackIos style={{ color: 'white' }} />
                  </IconButton>
                </div>
              )}

              {/* Right Navigation Button */}
              {index === currentMovies.length - 1 && showNextButton && (
                <div className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 z-10">
                  <IconButton
                    onClick={nextMovie}
                    color="primary"
                    aria-label="next movie"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '50%',
                    }}
                  >
                    <ArrowForwardIos style={{ color: 'white' }} />
                  </IconButton>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
