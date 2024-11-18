// src/services/userService.js
const userService = {
    getUserData: async () => {
      // Mocking a fetch user data function
      return {
        username: 'john_doe',
        email: 'john.doe@example.com',
        bio: 'Lifelong news enthusiast and tech junkie.',
      };
    },
  
    updateUserData: async (userData) => {
      // Mocking an update user data function
      console.log('Updating user data:', userData);
      return true;
    },
  
    getUserPreferences: async () => {
      // Mocking fetching user preferences
      return ['Technology', 'Business'];
    },
  
    updateUserPreferences: async (preferences) => {
      // Mocking updating user preferences
      console.log('Updating preferences:', preferences);
      return true;
    },
  };
  
  export default userService;
  