import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const apiKey = 'aebbe945a2b55aac48b2646bce30b705';

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then(response => {
        setMovies(response.data.results.slice(0, 5));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const nextMovie = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const prevMovie = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  const getGenres = (genreIds) => {
    const genreMap = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 
      18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 
      9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 
      10752: 'War', 37: 'Western'
    };
    return genreIds.map(id => genreMap[id] || 'Unknown').join(' • ');
  };

  return (
    <div className="relative w-full h-screen">
      {movies.length > 0 && (
        <>
          {/* Gambar latar belakang dengan efek blur yang lebih ringan */}
          <div 
            className="absolute inset-0 z-0" 
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movies[currentIndex].backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center', 
              width: '100%',
              height: '100%',
            }} 
          />
          
          {/* Overlay transparan */}
          <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

          {/* Overlay gradien */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
          
          {/* Konten utama */}
          <div className="relative z-20 flex items-center justify-center h-full px-4">
            <div className="flex w-full max-w-6xl">
              <div className="w-1/2 p-8">
                <h1 className="text-5xl font-extrabold text-white mb-4">
                  {movies[currentIndex].title}
                </h1>
                <p className="text-xl text-gray-300 mb-4">{getGenres(movies[currentIndex].genre_ids)}</p>
                <p className="text-lg text-gray-200 mb-6">{movies[currentIndex].overview}</p>
                <button className="bg-red-600 text-white px-6 py-3 rounded-full transform transition-all duration-300 hover:scale-105">
                  Watch Now
                </button>
              </div>
            </div>

            {/* Navigasi Film */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <button onClick={prevMovie} className="bg-gray-600 text-white p-4 rounded-full">
                <i className="fas fa-chevron-left"></i>
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <button onClick={nextMovie} className="bg-gray-600 text-white p-4 rounded-full">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
