import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegSadCry } from 'react-icons/fa'; 

const Search = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705';

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchQuery) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US`
          );
          setMovies(response.data.results);
        } catch (err) {
          setError('Failed to fetch movies');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMovies();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="text-center text-white mt-10">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white mt-10">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-white mb-8">Search Results</h1>
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
  );
};

export default Search;
