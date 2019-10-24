import axios from 'axios';

const api = axios.create({
  baseURL: 'http://68.183.144.161:3333',
});

export default api;
