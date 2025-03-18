import React, { useState } from 'react';
import { Home as HomeIcon, SportsMartialArts as SportsMartialArtsIcon, Theaters as TheatersIcon, SentimentDissatisfied as SentimentDissatisfiedIcon, Fingerprint as FingerprintIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({ onCategorySelect, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'Action', icon: <SportsMartialArtsIcon /> },
    { name: 'Drama', icon: <TheatersIcon /> },
    { name: 'Horror', icon: <SentimentDissatisfiedIcon /> },
    { name: 'Thriller', icon: <FingerprintIcon /> }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    navigate('/search');
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
    setSearchQuery(''); 
    navigate('/'); 
  };

  return (
    <div className="bg-black text-red-500 p-4">
      <div className="flex items-center justify-between space-x-8">
        <div className="flex items-center">
          <span
            className="font-bold text-lg cursor-pointer"
            onClick={() => handleCategoryClick('Home')}
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
              onClick={() => handleCategoryClick(category.name)}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full py-2 pl-4 pr-10 bg-[#282828] text-gray-300 rounded-md focus:outline-none"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button type="submit">
                  <i className="fas fa-search text-gray-300" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
