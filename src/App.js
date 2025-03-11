import React, { useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header onCategorySelect={handleCategorySelect} />
      <MovieList selectedCategory={selectedCategory} />
    </div>
  );
};

export default App;
