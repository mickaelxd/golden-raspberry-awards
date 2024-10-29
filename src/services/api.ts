import axios from 'axios';

const api = axios.create({
  baseURL: 'https://challenge.outsera.tech/api/movies',
});

export default api;
