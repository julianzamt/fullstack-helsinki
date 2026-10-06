import axios from 'axios';
const baseUrl = `${import.meta.env.VITE_API_URL}/api/blogs`;

let token = null;

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  const config = {
    headers: token ? { Authorization: token } : {},
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

export default { getAll, create, setToken };
