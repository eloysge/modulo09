import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.gobarber.carlo.com.br/gobarber',
});

export default api;
