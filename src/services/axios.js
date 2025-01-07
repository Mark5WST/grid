import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://your-api-base-url.com/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient; 