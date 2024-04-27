import React, { createContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;
    const lat = -1.283;
    const lon = 36.817;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${apiUrl}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}`
                );
                const data = await response.json();
                console.log("Weather data:", data);
                setWeatherData(data);
                setLoading(false);
            } catch (error) {
                console.error("Weather data fetch error:", error);
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);


  return (
    <WeatherContext.Provider 
        value={{ weatherData, loading, error}}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider, WeatherContext };
