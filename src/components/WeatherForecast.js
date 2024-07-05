import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './WeatherForecast.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherForecast = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY_WEATHER_API;

  useEffect(() => {
    if (city) {
      const fetchForecastData = async () => {
        try {
          const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city.name}&days=7&aqi=no&alerts=no`);
          setForecastData(response.data);
          setError(null);
        } catch (error) {
          console.error('Error fetching forecast data:', error);
          if (error.response) {
            console.error('Error data:', error.response.data);
            setError(`Error: ${error.response.data.error.message}`);
          } else {
            setError('Failed to fetch forecast data');
          }
        }
      };

      fetchForecastData();
    }
  }, [city, API_KEY]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!forecastData) {
    return <Typography>Loading...</Typography>;
  }

  const data = {
    labels: forecastData.forecast.forecastday.map((day) => day.date),
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: forecastData.forecast.forecastday.map((day) => day.day.maxtemp_c),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Min Temperature (°C)',
        data: forecastData.forecast.forecastday.map((day) => day.day.mintemp_c),
        fill: false,
        backgroundColor: 'rgba(192, 75, 192, 0.6)',
        borderColor: 'rgba(192, 75, 192, 1)',
      },
    ],
  };

  return (
    <Card className="card">
      <CardContent>
        <Line data={data} />
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
