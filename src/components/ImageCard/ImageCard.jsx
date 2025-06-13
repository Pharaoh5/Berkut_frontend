import React from 'react';
import { Link } from 'react-router-dom';

const ImageCard = ({ image, showActions = true }) => {
  const isFavorite = () => {
    const favs = localStorage.getItem('favorites');
    if (!favs) return false;
    return JSON.parse(favs).some(fav => fav.id === image.id);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    let favs = localStorage.getItem('favorites');
    favs = favs ? JSON.parse(favs) : [];
    if (isFavorite()) {
      favs = favs.filter(fav => fav.id !== image.id);
    } else {
      favs.push(image);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="image-card">
      <Link to={`/photos/${image.id}`}>
        <img src={image.urls.small} alt={image.alt_description || image.description} />
      </Link>
      {showActions && (
        <button onClick={handleFavorite} style={{marginTop: 8}}>
          {isFavorite() ? 'Убрать из избранного' : 'В избранное'}
        </button>
      )}
    </div>
  );
};

export default ImageCard;
