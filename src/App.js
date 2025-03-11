import React, { useState } from 'react';
import MovieList from './components/MovieList';
import Header from './components/Header';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header onCategorySelect={handleCategorySelect} onSearch={handleSearch} />
      <MovieList selectedCategory={selectedCategory} searchQuery={searchQuery} />
    </div>
  );
};

export default App;
