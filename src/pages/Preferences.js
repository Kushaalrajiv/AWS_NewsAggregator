// src/pages/Preferences.js
import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const availableTopics = [
  'Technology',
  'Health',
  'Business',
  'Sports',
  'Entertainment',
  'Science',
  'Politics',
];

const Preferences = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    // Fetch user preferences
    const fetchPreferences = async () => {
      const preferences = await userService.getUserPreferences();
      setSelectedTopics(preferences);
    };
    fetchPreferences();
  }, []);

  const handleToggleTopic = (topic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t !== topic)
        : [...prevTopics, topic]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userService.updateUserPreferences(selectedTopics);
    alert('Preferences updated successfully!');
  };

  return (
    <div className="preferences-page">
      <h2>Select Your News Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className="topics">
          {availableTopics.map((topic) => (
            <label key={topic} className="topic-label">
              <input
                type="checkbox"
                checked={selectedTopics.includes(topic)}
                onChange={() => handleToggleTopic(topic)}
              />
              {topic}
            </label>
          ))}
        </div>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default Preferences;
