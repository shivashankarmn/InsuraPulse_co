import axios from 'axios';

const API_URL = "http://localhost:8082/user";

// Register user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Login user
export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials).then(response => response.data);
};

// Update profile
export const updateProfile = (userData) => {
  return axios.put(`${API_URL}/update`, userData);
};

// Forgot password
export const forgotPassword = (username) => {
  return axios.post(`${API_URL}/forgot-password/${username}`);
};


