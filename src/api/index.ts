import api from 'axios';

api.create({
  timeout: 30000,
});
api.interceptors.response.use((response) => response.data);
export { api }
