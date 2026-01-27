import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.11.113:8000/api/students',
  timeout: 5000,
});

export default api;
