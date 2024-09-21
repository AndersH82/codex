import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://codex-api-3f893f5716ef.herokuapp.com/', // Adjust the base URL as needed
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;