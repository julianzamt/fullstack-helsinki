import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((r) => r.data);
};

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((r) => r.data);
};

const update = (p, np) => {
  const req = axios.put(`${baseUrl}/${p.id}`, np);
  return req.then((r) => r.data);
};

export default { getAll, create, remove, update };
