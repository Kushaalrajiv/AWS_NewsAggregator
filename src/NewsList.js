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
        console.log('Raw API response:', data); // Log raw response
        
        // Handle different possible response structures
        let newsData;
        try {
          newsData = data.body ? 
            (typeof data.body === 'string' ? JSON.parse(data.body) : data.body) : 
            data;
          console.log('Processed news data:', newsData);
        } catch (parseError) {
          console.error('Error parsing data:', parseError);
          throw new Error('Failed to parse API response');
        }
        
        if (Array.isArray(newsData)) {
          setNews(newsData);
        } else {
          console.error('Invalid data structure:', newsData);
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Detailed error:', error);
        setError(error.message || 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '1rem' }}>
        <div>Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#fee2e2', 
        border: '1px solid #ef4444',
        borderRadius: '0.375rem',
        color: '#dc2626'
      }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Error Details:</h2>
        <p>{error}</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Please check the console for more information.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        marginBottom: '1rem'
      }}>
        News Articles
      </h1>
      {news.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {news.map((article, index) => (
            <li 
              key={index}
              style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}
            >
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#2563eb',
                  textDecoration: 'none'
                }}
              >
                {article.title}
              </a>
              {article.description && (
                <p style={{ 
                  marginTop: '0.5rem',
                  color: '#4b5563'
                }}>
                  {article.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#4b5563' }}>No news articles available.</p>
      )}
    </div>
  );
};

export default NewsList;