import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Home as HomeIcon, SportsMartialArts as SportsMartialArtsIcon, Theaters as TheatersIcon, Tv as TvIcon, SentimentDissatisfied as SentimentDissatisfiedIcon, Fingerprint as FingerprintIcon } from '@mui/icons-material';

const Header = ({ onCategorySelect, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'Action', icon: <SportsMartialArtsIcon /> },
    { name: 'Drama', icon: <TheatersIcon /> },
    { name: 'Horror', icon: <SentimentDissatisfiedIcon /> },  
    { name: 'Thriller', icon: <FingerprintIcon /> },  
    { name: 'TV Show', icon: <TvIcon /> }
  ];
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleHomeClick = () => {
    onCategorySelect('Home');
  };

  return (
    <div className="bg-black text-white p-4">
      <div className="flex items-center justify-between space-x-8">
        <div className="flex items-center">
          <span
            className="font-bold text-lg cursor-pointer"
            onClick={handleHomeClick}
            style={{ fontFamily: 'Expletus Sans' }}
          >
            MyFlix
          </span>
        </div>

        <div className="flex justify-center flex-1 space-x-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className="font-bold text-white hover:text-red-500 flex items-center space-x-2 px-4 py-2 transition duration-300"
              onClick={() => onCategorySelect(category.name)}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center">
          <TextField
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            className="bg-gray-200 text-black"
            placeholder="Search anything..."
            size="small"
            style={{ width: '250px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-500" />
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: '50px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f2f2f2',
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
