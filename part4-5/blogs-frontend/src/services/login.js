import axios from 'axios';
const baseUrl = `${import.meta.env.VITE_API_URL}/api/login`;

const login = async (loginData) => {
  const response = await axios.post(baseUrl, loginData);
  return response.data;
};

export default { login };
