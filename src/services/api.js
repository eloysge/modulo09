import axios from 'axios';

const api = axios.create({
  baseURL: 'http://gobarber.homeip.net:3333',
});

export default api;
