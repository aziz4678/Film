import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MovieList from './pages/MovieList'
import Header from './components/Header'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home')
  const [searchQuery, setSearchQuery] = useState('')

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <Router>
      <Header onCategorySelect={handleCategorySelect} onSearch={handleSearch} />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<MovieList selectedCategory={selectedCategory} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search searchQuery={searchQuery} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
