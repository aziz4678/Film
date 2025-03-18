import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Hero from '../pages/hero';

const MovieList = ({ selectedCategory }) => {
  const [movies, setMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topIndo, setTopIndo] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&page=${currentPage}`;
        
        if (selectedCategory === 'Action') {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&language=en-US&page=${currentPage}`;
        } else if (selectedCategory === 'Drama') {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&language=en-US&page=${currentPage}`;
        } else if (selectedCategory === 'Horror') {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&language=en-US&page=${currentPage}`;
        } else if (selectedCategory === 'Thriller') {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53&language=en-US&page=${currentPage}`;
        }

        const [moviesRes, upcomingRes, topRatedRes, topIndoRes, latestRes] = await Promise.all([
          axios.get(apiUrl),
          axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`),
          axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`),
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=id-ID&with_original_language=id&page=1&sort_by=popularity.desc`),
          axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        ]);

        setMovies(moviesRes.data.results || []);
        setHeroMovies(moviesRes.data.results.slice(0, 5) || []);
        setTopRatedMovies(topRatedRes.data.results || []);
        setTopIndo(topIndoRes.data.results || []);
        setLatest(latestRes.data.results || []);
        setUpcomingMovies(upcomingRes.data.results || []);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black">
      {heroMovies.length > 0 && <Hero movies={heroMovies} />}
      <MovieSection title="Trending Now" movies={movies} />
      <MovieSection title="Popular Movies" movies={latest} />
      <MovieSection title="Top Rated Movies" movies={topRatedMovies} />
      <MovieSection title="Indonesia" movies={topIndo} />
      <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
    </div>
  );
};

const MovieSection = ({ title, movies }) => {
  const [startIndex, setStartIndex] = useState(0);
  const moviesToShow = movies.slice(startIndex, startIndex + 5);

  const prevMovie = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const nextMovie = () => {
    if (startIndex + 5 < movies.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

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
          {moviesToShow.map((movie, index) => (
            <div key={movie.id} className="relative w-60">
              <Link to={`/movie/${movie.id}`}>
                <img
                  alt={movie.title}
                  className="w-full h-80 object-cover rounded-lg hover:scale-105 transition-all duration-300"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              </Link>
              <div className="absolute bottom-2 left-2 text-8xl font-bold text-red-800">
                {startIndex + index + 1}
              </div>
            </div>
          ))}
        </div>
        {startIndex + 5 < movies.length && (
          <IconButton onClick={nextMovie} className="absolute right-[-40px] z-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%' }}>
            <ArrowForwardIos style={{ color: 'white' }} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default MovieList;
