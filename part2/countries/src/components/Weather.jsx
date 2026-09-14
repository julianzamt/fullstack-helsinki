import weatherService from "../services/weather";
import { useState, useEffect } from "react";

const Weather = ({ city, lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.get(lat, lon).then((w) => setWeather(w.data));
  }, [lat, lon]);

  if (!weather) return null;
  console.log({ weather });

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weather.temp}°</p>
      <p>{weather.weather.icon}</p>
      <p>Wind: {weather.wind} m/s</p>
    </div>
  );
};

export default Weather;
