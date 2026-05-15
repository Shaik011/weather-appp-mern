import { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleInput = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 2) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${val}&limit=5&appid=ac5c7cf7c224c62e19f8b75ed9db4f99`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setQuery(city.name);
    setSuggestions([]);
  };

  const fetchWeather = async () => {
    if (!query) return;
    setError("");
    setWeather(null);
    setSuggestions([]);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/weather?city=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      setWeather(data);
    } catch {
      setError("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="app-header">
        <div className="search-wrapper">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search city…"
              value={query}
              onChange={handleInput}
              onBlur={() => setTimeout(() => setSuggestions([]), 150)}
              onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
            />
            <button className="search-btn" onClick={fetchWeather}>Go</button>
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((city, index) => (
                <li key={index} onMouseDown={() => handleSelect(city)}>
                  📍 {city.name}, {city.state ? city.state + ", " : ""}{city.country}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {weather && (
        <>
          <div className="location">📍 {weather.country}</div>
          <div className="city">{weather.city}</div>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">🌡️</span>
              <span className="stat-val">{weather.temperature}°C</span>
              <span className="stat-label">Temperature</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">💧</span>
              <span className="stat-val">{weather.humidity}%</span>
              <span className="stat-label">Humidity</span>
            </div>
          </div>
        </>
      )}

      {!weather && !error && (
        <p className="placeholder-msg">Search for a city to see the weather.</p>
      )}
    </div>
  );
}
