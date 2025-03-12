import React, { useState } from 'react';
import MovieList from './components/MovieList';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedMovie(null); 
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovie(movieId); 
  };

  const handleCloseMovieDetail = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Header onCategorySelect={handleCategorySelect} onSearch={handleSearch} />
      
      {selectedMovie ? (
        <MovieDetail movieId={selectedMovie} onClose={handleCloseMovieDetail} />
      ) : (
        <MovieList
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onMovieClick={handleMovieClick}
        />
      )}
    </div>
  );
};

export default App;
