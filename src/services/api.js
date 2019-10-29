import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.sgeinformatica.com.br/gobarber',
});

export default api;
