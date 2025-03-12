import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material'; 
import { Search as SearchIcon } from '@mui/icons-material'; 
const Header = ({ onCategorySelect, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Home', 'Action', 'Drama', 'Horror', 'Thriller', 'TV Show'];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query); 
    onSearch(query); 
  };

  const handleHomeClick = () => {
    onCategorySelect('Home'); 
  };

  return (
    <div className="bg-black text-white p-4">
      <div className="flex items-center justify-between space-x-8">
        {/* MyFlix Logo - Left Side */}
        <div className="flex items-center">
          <span
            className="font-bold text-lg cursor-pointer"
            onClick={handleHomeClick}
          >
            MyFlix
          </span>
        </div>

        {/* Category Tags - Centered */}
        <div className="flex justify-center flex-1 space-x-6">
          {categories.map((category, index) => (
            <button
              key={index}
              className="text-white hover:text-red-500 px-4 py-2 transition duration-300"
              onClick={() => onCategorySelect(category)} 
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input - Right Side */}
        <div className="flex items-center space-x-4">
          <TextField
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch} 
            className="bg-white text-black"
            placeholder="Search something..."
            size="small"
            style={{ width: '300px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className="text-gray-500" />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
