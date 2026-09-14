import axios from "axios";

const get = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
  return axios.get(url).then((res) => res.data);
};

export default { get };
