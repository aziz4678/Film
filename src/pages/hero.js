import React from 'react';

const Hero = ({ movies }) => {
  const movie = movies[0]; 

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
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
