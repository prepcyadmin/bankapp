import axios from 'axios';

// Replace with your actual backend server URL
const API_URL = 'http://localhost:5000';  // Change to your server's URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API
export const login = (account_number, password) => {
  return api.post('/login', { account_number, password });
};

// Register API
export const register = (account_number, name, phone, password, pin) => {
  return api.post('/register', { account_number, name, phone, password, pin });
};

// Deposit API
export const deposit = (userId, amount) => {
  return api.post('/deposit', { userId, amount });
};

// Withdraw API
export const withdraw = (userId, amount) => {
  return api.post('/withdraw', { userId, amount });
};

export default api;
