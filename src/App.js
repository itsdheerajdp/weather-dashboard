import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherForecast from './components/WeatherForecast';
import './App.css';

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom className="title-animation">
        Weather Dashboard
      </Typography>
      <SearchBar onSelectCity={handleSelectCity} />
      {selectedCity && (
        <>
          <Typography variant="h5" gutterBottom className="title-animation">
            Current Weather
          </Typography>
          <WeatherDisplay city={selectedCity} />
          <Typography variant="h5" gutterBottom className="title-animation">
            7-Day Forecast
          </Typography>
          <WeatherForecast city={selectedCity} />
        </>
      )}
    </Container>
  );
};

export default App;
