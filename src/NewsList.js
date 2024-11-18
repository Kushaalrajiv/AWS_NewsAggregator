import React, { useState, useEffect } from "react";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://txvsj2cmf9.execute-api.us-west-2.amazonaws.com/news', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const newsData = data.body 
          ? (typeof data.body === 'string' ? JSON.parse(data.body) : data.body) 
          : data;

        if (Array.isArray(newsData)) {
          setNews(newsData);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        setError(error.message || 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading news...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', fontWeight: 'bold' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      padding: '1rem'
    }}>
      {news.map((article, index) => (
        <div 
          key={index} 
          style={{
            padding: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: '#f9fafb',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#2563eb',
              textDecoration: 'none',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}
          >
            {article.title}
          </a>
          {article.description && (
            <p style={{
              marginTop: '0.5rem',
              color: '#4b5563',
              lineHeight: '1.5'
            }}>
              {article.description}
            </p>
          )}
          <small style={{
            display: 'block',
            marginTop: '0.5rem',
            color: '#6b7280'
          }}>
            Published: {new Date(article.publishedAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
