import React from 'react';

const Header = ({ onCategorySelect }) => {
  const categories = ['Home', 'Movies', 'Series', 'Anime', 'Sports', 'TV Show'];

  return (
    <div className="bg-black text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-6">
          <span className="font-bold text-lg">Vidio</span>
          {categories.map((category, index) => (
            <button
              key={index}
              className="hover:text-gray-300"
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Search anything..."
            className="p-2 rounded-md border border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
