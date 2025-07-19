import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const API_KEY = "3afd0565c7c3f98e16402ded05a44e4f"; // Replace with your API key

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const fetchWeather = async () => {
    const cityFormatted = city.trim().toLowerCase();
    if (!cityFormatted) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityFormatted}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (error) {
      setError("City not found!");
      setWeather(null);
    }
  };

  const getBackgroundClass = () => {
    if (!weather) return "default";
    return weather.weather[0].main.toLowerCase(); // e.g., "clouds", "rain"
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="top-bar">
        <h1 className="title">🌤️ WeatherNow</h1>
        <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="desc">{weather.weather[0].description}</p>
          <div className="temp-humidity">
            <p>🌡️ Temp: {weather.main.temp} °C</p>
            <p>Feels like: {weather.main.feels_like} °C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
            <p>📈 Max: {weather.main.temp_max} °C / 📉 Min: {weather.main.temp_min} °C</p>
          </div>
        </div>
      )}

      <footer>
        <p>BC SUBHENDU </p>
      </footer>
    </div>
  );
}

export default App;
