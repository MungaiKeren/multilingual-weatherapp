import React, { createContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const lat = -1.283;
  const lon = 36.817;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');          
        }
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherContextProvider };
