// src/components/NewsFeed.js
import React from 'react';
import NewsList from '../NewsList'; // Import NewsList

const NewsFeed = () => {
  return (
    <div className="news-feed" style={{ padding: '1rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#333'
      }}>
        Latest News
      </h2>
      {/* Render NewsList Component */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
      }}>
        <NewsList />
      </div>
    </div>
  );
};

export default NewsFeed;
