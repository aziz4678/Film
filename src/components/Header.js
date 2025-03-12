import React, { useState } from 'react';

const Header = ({ onCategorySelect, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Home', 'Action', 'Drama', 'Horror', 'Thriller', 'TV Show'];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Pass search query to parent component (App.js)
  };

  return (
    <div className="bg-black text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-6">
          <span className="font-bold text-lg">MyFlix</span>
          {categories.map((category, index) => (
            <button
              key={index}
              className="hover:text-gray-300"
              onClick={() => onCategorySelect(category)} // Handle category selection
            >
              {category}
            </button>
          ))}
        </div>
        <div>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-md border border-gray-600 text-black"
              placeholder="Search anything..."
            />
            <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-md">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
