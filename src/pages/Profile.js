// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userService.getUserData();
      setUser(data);
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userService.updateUserData(user);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Bio:
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
