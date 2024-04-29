import React, { createContext, useState, useEffect } from 'react';
// import { useTranslation } from "react-i18next";

const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // const { t } = useTranslation();

  const apiKey = process.env.REACT_APP_API_KEY;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=-1.283&lon=36.817&units=metric&exclude=minutely&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');          
        }
        const data = await response.json();
        // console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <WeatherContext.Provider value={{ weatherData, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherContextProvider };
