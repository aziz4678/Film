import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail';
import Search from './components/Search';

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
        <Header onCategorySelect={handleCategorySelect} onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<MovieList selectedCategory={selectedCategory} />} />
          <Route path="/movie/:id" element={<MovieDetail />}/>
          <Route path="/search" element={<Search searchQuery={searchQuery} />}/>
        </Routes>
    </Router>
  );
};

export default App;
