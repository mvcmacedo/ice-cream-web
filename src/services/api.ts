import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_ICE_CREAM_API,
});

export default api;
