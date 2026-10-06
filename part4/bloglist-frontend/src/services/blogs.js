import axios from 'axios';
const baseUrl = `${import.meta.env.VITE_API_URL}/api/blogs`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
