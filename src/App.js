import { useState } from "react";
import weatherData from "./weatherData";
import "./App.css";

function App() {
  const defaultCity = weatherData[0];

  const [searchText, setSearchText] = useState("");
  const [selectedWeather, setSelectedWeather] = useState(defaultCity);
  const [error, setError] = useState("");

  function handleSearch(event) {
    event.preventDefault();

    const normalizedSearch = searchText.trim().toLowerCase();

    if (!normalizedSearch) {
      setError("Please enter a city name.");
      return;
    }

    const cityWeather = weatherData.find(
      (weather) => weather.city.toLowerCase() === normalizedSearch
    );

    if (!cityWeather) {
      setError(`Weather data for "${searchText}" is not available.`);
      return;
    }

    setSelectedWeather(cityWeather);
    setError("");
  }

  function handleInputChange(event) {
    setSearchText(event.target.value);

    if (error) {
      setError("");
    }
  }

  return (
    <main className="app">
      <section className="weather-dashboard">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Local Weather Dashboard</p>
            <h1>Weather Today</h1>
          </div>

          <div className="data-status">
            <span className="status-dot"></span>
            Static data
          </div>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <label htmlFor="city-search" className="sr-only">
            Search for a city
          </label>

          <input
            id="city-search"
            type="search"
            placeholder="Search for a city..."
            value={searchText}
            onChange={handleInputChange}
          />

          <button type="submit">Search</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="weather-content">
          <section className="current-weather">
            <div className="location">
              <h2>{selectedWeather.city}</h2>
              <span className="country-code">
                {selectedWeather.country}
              </span>
            </div>

            <p className="description">{selectedWeather.description}</p>

            <div className="temperature-row">
              <span className="weather-icon" aria-label={selectedWeather.description}>
                {selectedWeather.icon}
              </span>

              <span className="temperature">
                {selectedWeather.temperature}°
              </span>
              <span className="temperature-unit">C</span>
            </div>

            <p className="feels-like">
              Feels like {selectedWeather.feelsLike}°C
            </p>
          </section>

          <section className="weather-details" aria-label="Weather details">
            <WeatherDetail
              label="Humidity"
              value={`${selectedWeather.humidity}%`}
              icon="💧"
            />

            <WeatherDetail
              label="Wind speed"
              value={`${selectedWeather.windSpeed} km/h`}
              icon="💨"
            />

            <WeatherDetail
              label="Pressure"
              value={`${selectedWeather.pressure} hPa`}
              icon="🎚️"
            />
          </section>
        </div>

        <div className="available-cities">
          <p>Available cities:</p>

          <div className="city-list">
            {weatherData.map((weather) => (
              <button
                key={weather.city}
                className="city-button"
                type="button"
                onClick={() => {
                  setSelectedWeather(weather);
                  setSearchText(weather.city);
                  setError("");
                }}
              >
                {weather.city}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function WeatherDetail({ label, value, icon }) {
  return (
    <div className="weather-detail">
      <span className="detail-icon" aria-hidden="true">
        {icon}
      </span>

      <div>
        <p className="detail-label">{label}</p>
        <p className="detail-value">{value}</p>
      </div>
    </div>
  );
}

export default App;
