// src/components/Header.js
import React from 'react';
import Search from './Search';

const Header = () => {
  return (
    <header className="header">
      <h1>News Aggregator</h1>
      <Search />
    </header>
  );
};

export default Header;
