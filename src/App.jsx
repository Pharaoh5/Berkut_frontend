import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage/HomePage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import PhotoDetailPage from './pages/PhotoDetailPage/PhotoDetailPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/photos/:id" element={<PhotoDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  )
}

export default App
