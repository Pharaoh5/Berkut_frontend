import React, { useEffect, useState } from 'react';
import ImageGrid from '../../components/ImageGrid';

const getFavorites = () => {
  const favs = localStorage.getItem('favorites');
  return favs ? JSON.parse(favs) : [];
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
    const syncFavorites = () => setFavorites(getFavorites());
    window.addEventListener('storage', syncFavorites);
    return () => window.removeEventListener('storage', syncFavorites);
  }, []);

  return (
    <div>
      <h1>Избранное</h1>
      {favorites.length === 0 ? (
        <p>У вас нет избранных изображений.</p>
      ) : (
        <ImageGrid images={favorites} />
      )}
    </div>
  );
};

export default FavoritesPage;
