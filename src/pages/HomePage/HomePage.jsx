import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ImageGrid from '../../components/ImageGrid';
import { fetchRandomImages } from '../../services/unsplash';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [randomImages, setRandomImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getImages = async () => {
      try {
        const images = await fetchRandomImages(9); // Запрашиваем 9 случайных изображений
        setRandomImages(images);
      } catch (err) {
        setError('Не удалось загрузить случайные изображения. Пожалуйста, попробуйте еще раз.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div>
      <h1>Добро пожаловать в поиск изображений</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} onSearch={handleSearch} />
      {loading && <p>Загрузка изображений...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && randomImages.length > 0 && (
        <ImageGrid images={randomImages} showActions={false} />
      )}
    </div>
  );
};

export default HomePage;
