import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'; // Material UI icons

const Hero = ({ movies }) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);  // State untuk menyimpan indeks film yang ditampilkan

  const movie = movies[currentHeroIndex]; // Ambil film berdasarkan indeks saat ini

  const nextMovie = () => {
    setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % movies.length); // Pindah ke film berikutnya
  };

  const prevMovie = () => {
    setCurrentHeroIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length); // Pindah ke film sebelumnya
  };

  return (
    <div className="relative w-full h-screen">
      {movie && (
        <>
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}
          />
          <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
          <div className="relative z-20 flex items-center justify-center h-full px-4">
            <div className="flex w-full max-w-6xl">
              <div className="w-1/2 p-8">
                <h1 className="text-5xl font-extrabold text-white mb-4">
                  {movie.title}
                </h1>
                <p className="text-xl text-gray-300 mb-4">{movie.overview}</p>
                <button className="bg-red-600 text-white px-6 py-3 rounded-full transform transition-all duration-300 hover:scale-105">
                  Watch Now
                </button>
              </div>
            </div>

            {/* Navigasi Film */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2"> 
              <IconButton
                onClick={prevMovie}
                color="primary"
                aria-label="previous movie"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '50%',
                }}
              >
                <ArrowBackIos style={{ color: 'white', transform: 'translateX(5px)' }} />
              </IconButton>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
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
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
