import React, { useContext } from "react";
import { WeatherContext } from "./Contexts/WeatherContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCloud } from "@fortawesome/free-solid-svg-icons";

export default function HourlyForecast() {
  const { weatherData, error } = useContext(WeatherContext);

  const hourlyForecasts = weatherData?.hourly.slice(0, 6);

  function formatHour(timestamp) {
    const milliseconds = timestamp * 1000;

    const date = new Date(milliseconds);  
    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Format the time
    let formattedHour;
    if (hours === 12) {
      formattedHour = `${hours}:${minutes < 10 ? '0' : ''}${minutes} PM`;
    } else {
      formattedHour = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    }
  
    return formattedHour;
  }
  

  return (
    <div className="forecast">
      {console.log(hourlyForecasts)}
      <h4>
        <FontAwesomeIcon icon={faClock} /> Hourly Forecast
      </h4>
      <hr />
      <div className="item">
      {hourlyForecasts && hourlyForecasts.map((forecast, index) => {
        const forecastTime = formatHour(forecast.dt);
        const currentTime = formatHour(Date.now() / 1000); // Current time in Unix timestamp
        
        return (
          <div className="itm" key={index}>
            <p>{forecastTime === currentTime ? 'Now' : forecastTime}</p>
            <p>{forecast.temp} &deg;</p>
            <img
              src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
              alt=""
            />
          </div>
        );
      })} 
      </div>
      <hr />
    </div>
  );
}
