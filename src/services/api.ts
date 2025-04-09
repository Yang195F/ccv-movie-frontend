import axios from "axios";

const API_URL = "https://your-backend-url.com/api"; // Your backend API URL

// Fetch movies
export const getMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Fetch hero slides
export const getHeroSlides = async () => {
  try {
    const response = await axios.get(`${API_URL}/hero-slides`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    throw error;
  }
};

// Fetch cinemas
export const getCinemas = async () => {
  try {
    const response = await axios.get(`${API_URL}/cinemas`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cinemas:", error);
    throw error;
  }
};
