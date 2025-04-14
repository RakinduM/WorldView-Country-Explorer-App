import axios from 'axios';

const API_BASE = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE}/all`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE}/name/${name}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${API_BASE}/region/${region}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${API_BASE}/alpha/${code}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};