import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import ImageGrid from '../../components/ImageGrid';
import Pagination from '../../components/Pagination';
import { searchImages } from '../../services/unsplash';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    searchImages(query, currentPage)
      .then(({ results, total_pages }) => {
        setImages(results);
        setTotalPages(total_pages);
      })
      .catch(() => setError('Ошибка при поиске изображений.'))
      .finally(() => setLoading(false));
  }, [query, currentPage]);

  const handleSearch = () => {
    if (query.trim()) {
      setCurrentPage(1);
      navigate(`/search?query=${query}`);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && images.length > 0 && (
        <>
          <ImageGrid images={images} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {!loading && !error && images.length === 0 && <p>Нет результатов.</p>}
    </div>
  );
};

export default SearchResultsPage;
