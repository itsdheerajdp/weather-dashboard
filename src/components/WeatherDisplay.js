import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import './WeatherDisplay.css';

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (city) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}`);
          setWeatherData(response.data);
          setError(null);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          if (error.response) {
            console.error('Error data:', error.response.data);
            setError(`Error: ${error.response.data.message}`);
          } else {
            setError('Failed to fetch weather data');
          }
        }
      };

      fetchWeatherData();
    }
  }, [city, API_KEY]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!weatherData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card className="card weather-card">
      <CardContent>
        <Typography variant="h5">{weatherData.name}</Typography>
        <Typography>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</Typography>
        <Typography>Humidity: {weatherData.main.humidity}%</Typography>
        <Typography>Wind Speed: {weatherData.wind.speed} m/s</Typography>
        <Typography>Weather: {weatherData.weather[0].description}</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
