import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail';

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
    <Router>
      <div>
        {/* Header */}
        <Header onCategorySelect={handleCategorySelect} onSearch={handleSearch} />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={<MovieDetail />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
