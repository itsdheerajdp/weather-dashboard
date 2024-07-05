import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, Paper } from '@mui/material';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ onSelectCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    console.log('API_KEY:', API_KEY); // Verify the environment variable is loaded correctly
  }, [API_KEY]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${e.target.value}&appid=${API_KEY}`);
        setSuggestions(response.data.list);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
        if (error.response) {
          console.error('Error data:', error.response.data);
        }
      }
    }
  };

  const handleSelectCity = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    onSelectCity(city);
  };

  return (
    <div>
      <TextField
        label="Search City"
        value={query}
        onChange={handleSearch}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      {suggestions.length > 0 && (
        <Paper className="suggestions">
          <List>
            {suggestions.map((city) => (
              <ListItem button key={city.id} onClick={() => handleSelectCity(city)}>
                <ListItemText primary={city.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;
