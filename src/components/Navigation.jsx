import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '24px',
};

const Navigation = () => {
  const location = useLocation();
  return (
    <nav style={navStyle}>
      <Link to="/" style={{ fontWeight: location.pathname === '/' ? 'bold' : 'normal' }}>Главная</Link>
      <Link to="/favorites" style={{ fontWeight: location.pathname === '/favorites' ? 'bold' : 'normal' }}>Избранное</Link>
    </nav>
  );
};

export default Navigation;
