import axios from "axios";

const get = () =>
  axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((res) => res.data);

export default { get };
