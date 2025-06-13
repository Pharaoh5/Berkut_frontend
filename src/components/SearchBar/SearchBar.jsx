import React from 'react';

const SearchBar = ({ value, onChange, onSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Искать изображения..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={onSearch}>Поиск</button>
    </div>
  );
};

export default SearchBar;
