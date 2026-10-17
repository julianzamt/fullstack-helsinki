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

const like = async (id, blog) => {
  const res = await axios.put(`${baseUrl}/${id}`, blog);
  return res.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: token ? { Authorization: token } : {},
  };
  return await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, setToken, like, deleteBlog };
