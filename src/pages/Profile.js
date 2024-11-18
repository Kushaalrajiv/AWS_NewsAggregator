import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { withAuthenticator } from '@aws-amplify/ui-react';
import userService from '../services/userService';
import '../Profile.css';

const Profile = ({ user, signOut, onComplete }) => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    bio: '',
  });
  const navigate = useNavigate(); 
  const isNewUser = !user.attributes; 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!isNewUser) {
          // Fetch user data for existing users
          const data = await userService.getUserData(user.username);
          setProfileData(data || { username: '', email: user.attributes.email, bio: '' });
        } else {
          // Leave fields empty for new users
          setProfileData({ username: '', email: '', bio: '' });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setProfileData({ username: '', email: '', bio: '' });
      }
    };

    fetchUserData();
  }, [user, isNewUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUserData(profileData);
      alert('Profile updated successfully!');
      onComplete?.(); // Call onComplete callback if provided
      navigate('/'); // Redirect to Home page
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
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
            value={profileData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>

        <label>
          Bio:
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          />
        </label>

        <button type="submit">Save Changes</button>
      </form>
      <button onClick={signOut} className="sign-out-button">
        Sign Out
      </button>
    </div>
  );
};

export default withAuthenticator(Profile);
