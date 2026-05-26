import axios from 'axios';

const api = axios.create({
  baseURL: 'https://alunos-ads-api-production.up.railway.app'
});

export default api;