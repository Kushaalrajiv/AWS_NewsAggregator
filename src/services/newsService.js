// src/services/newsService.js
const API_URL = "https://txvsj2cmf9.execute-api.us-west-2.amazonaws.com/news";

const getNews = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Handle body structure
    return data.body 
      ? typeof data.body === "string" 
        ? JSON.parse(data.body) 
        : data.body
      : data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export default { getNews }; // Keep this for data fetching
