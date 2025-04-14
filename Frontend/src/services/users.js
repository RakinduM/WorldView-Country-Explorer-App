import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getFavorites = async (token) => {
  try {
    const response = await axios.get(`${API_BASE}/users/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addFavorite = async (countryCode, token) => {
  try {
    const response = await axios.post(
      `${API_BASE}/users/favorites`,
      { countryCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeFavorite = async (countryCode, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE}/users/favorites/${countryCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
