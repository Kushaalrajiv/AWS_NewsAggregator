// src/pages/Home.js
import React from 'react';
import NewsFeed from '../components/NewsFeed';

const Home = () => {
  return (
    <div className="home-page">
      <h2>Welcome to News Aggregator</h2>
      <p>Stay updated with the latest news tailored to your preferences.</p>
      <NewsFeed />
    </div>
  );
};

export default Home;
