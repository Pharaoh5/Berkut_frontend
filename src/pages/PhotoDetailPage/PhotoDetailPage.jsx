import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPhotoById } from '../../services/unsplash';
import { FaHeart, FaRegHeart, FaDownload } from 'react-icons/fa';

const PhotoDetailPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPhoto = async () => {
      try {
        const data = await fetchPhotoById(id);
        setPhoto(data);
      } catch {
        setError('Ошибка при загрузке фотографии.');
      } finally {
        setLoading(false);
      }
    };
    getPhoto();
  }, [id]);

  const isFavorite = () => {
    if (!photo || !photo.id) return false;
    const favs = localStorage.getItem('favorites');
    if (!favs) return false;
    return JSON.parse(favs).some(fav => fav && fav.id === photo.id);
  };

  const handleFavorite = () => {
    if (!photo) return;
    let favs = localStorage.getItem('favorites');
    favs = favs ? JSON.parse(favs) : [];
    if (isFavorite()) {
      favs = favs.filter(fav => fav.id !== photo.id);
    } else {
      favs.push(photo);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    window.dispatchEvent(new Event('storage'));
  };

  const handleDownload = () => {
    if (!photo) return;
    const link = document.createElement('a');
    link.href = photo.urls.full;
    link.download = `unsplash-photo-${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!photo) return null;

  return (
    <div className="photo-detail">
      <div className="photo-detail-actions">
        <button className="fav-btn" onClick={handleFavorite} aria-label="В избранное">
          {isFavorite() ? <FaHeart color="#FF5A5F" size={28} /> : <FaRegHeart color="#222" size={28} />}
        </button>
        <button className="download-btn" onClick={handleDownload} aria-label="Скачать">
          <FaDownload size={24} />
        </button>
      </div>
      <img src={photo.urls.regular} alt={photo.alt_description || photo.description} />
    </div>
  );
};

export default PhotoDetailPage;
