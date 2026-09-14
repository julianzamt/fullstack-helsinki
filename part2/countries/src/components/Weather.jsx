import weatherService from "../services/weather";
import { useState, useEffect } from "react";

const Weather = ({ city, lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.get(lat, lon).then((w) => {
      console.log(w);
      setWeather(w);
    });
  }, [lat, lon]);

  if (!weather) return null;

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weather.main.temp}°</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
