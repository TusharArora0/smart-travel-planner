import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WeatherForecast.css';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Major tourist destinations in Uttarakhand
  const destinations = [
    {
      name: "Kedarnath",
      coordinates: { lat: 30.7346, lon: 79.0669 }
    },
    {
      name: "Rishikesh",
      coordinates: { lat: 30.1087, lon: 78.2919 }
    },
    {
      name: "Nainital",
      coordinates: { lat: 29.3919, lon: 79.4542 }
    },
    {
      name: "Mussoorie",
      coordinates: { lat: 30.4598, lon: 78.0644 }
    },
    {
      name: "Auli",
      coordinates: { lat: 30.5317, lon: 79.5690 }
    }
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const weatherPromises = destinations.map(destination => 
          axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              lat: destination.coordinates.lat,
              lon: destination.coordinates.lon,
              appid: process.env.LTCREACT_APP_WEATHER_API_KEY,
              units: 'metric'
            }
          })
        );

        const responses = await Promise.all(weatherPromises);
        const weatherResults = {};
        
        responses.forEach((response, index) => {
          weatherResults[destinations[index].name] = response.data;
        });

        setWeatherData(weatherResults);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeatherData, 1800000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="weather-loading">Loading weather data...</div>;
  }

  if (error) {
    return <div className="weather-error">{error}</div>;
  }

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  return (
    <div className="weather-forecast">
      <h2>Weather Forecast</h2>
      <div className="weather-cards">
        {destinations.map(destination => {
          const data = weatherData[destination.name];
          if (!data) return null;

          return (
            <div key={destination.name} className="weather-card">
              <h3>{destination.name}</h3>
              <div className="weather-info">
                <img 
                  src={getWeatherIcon(data.weather[0].icon)} 
                  alt={data.weather[0].description}
                />
                <div className="temperature">
                  <span className="temp-main">{Math.round(data.main.temp)}°C</span>
                  <span className="temp-range">
                    {Math.round(data.main.temp_min)}°C / {Math.round(data.main.temp_max)}°C
                  </span>
                </div>
                <div className="weather-details">
                  <p>{data.weather[0].description}</p>
                  <p>Humidity: {data.main.humidity}%</p>
                  <p>Wind: {Math.round(data.wind.speed * 3.6)} km/h</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;