import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          setError('Gagal mengambil data film');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMovies();
  }, [searchQuery]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-center mt-10">{error}</div>;
  }

  return (
    <div className="bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-4 text-white">Hasil Pencarian</h1>
        {movies.length === 0 ? (
          <div className="text-center text-white mt-10">
            <h2>Tidak ada hasil yang ditemukan</h2>
            <p>Coba cari dengan kata kunci lain.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="relative w-60">
                <img
                  alt={movie.title}
                  className="w-full h-80 object-cover rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                <div className="absolute bottom-2 left-2 text-lg font-bold text-red-800">
                  {movie.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
