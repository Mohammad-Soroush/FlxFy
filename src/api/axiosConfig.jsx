import axios from 'axios';

const api = axios.create({
  // CORRECT BASE URL
  baseURL: 'https://fixfy.liara.run/api', 
});

// We will also add an interceptor to handle token refresh logic in the future if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
