import React, { useContext, useState } from "react";
import { WeatherContext } from "./Contexts/WeatherContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCloudRain,
  faLocationArrow,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

export default function HourlyForecast(props) {
  const { weatherData, error } = useContext(WeatherContext);
  const [active, setActive] = useState(null);

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
      formattedHour = `${hours}:${minutes < 10 ? "0" : ""}${minutes} PM`;
    } else {
      formattedHour = `${hours % 12 === 0 ? 12 : hours % 12}:${
        minutes < 10 ? "0" : ""
      }${minutes} ${hours >= 12 ? "PM" : "AM"}`;
    }

    return formattedHour;
  }

  return (
    <div className="hourly-forecast">
      {console.log(hourlyForecasts)}
      <h4>
        <FontAwesomeIcon icon={faClock} /> Hourly Forecast
      </h4>
      <hr />
      <div className="item">
        {hourlyForecasts ? (
          hourlyForecasts &&
          hourlyForecasts.map((forecast, index) => {
            const forecastTime = formatHour(forecast.dt);
            const currentTime = formatHour(Date.now() / 1000);
            const isActive = active === index;
            return (
              <div
                className={`itm ${isActive ? "active" : ""}`}
                key={index}
                onClick={() => setActive(index)}
              >
                <p>{forecastTime === currentTime ? "Now" : forecastTime}</p>
                <p>{Math.trunc(forecast.temp)} &deg;</p>
                <img
                  src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                  alt=""
                />
              </div>
            );
          })
        ) : error ? (
          <p className="text-danger">
            Error fetching weather data. Please try again later.
          </p>
        ) : (
          <Loading />
        )}
      </div>
      <hr />
      {active && (
        <div className="details">
          <div>
            <span>Feel like: {hourlyForecasts[active].feels_like} &deg;</span>
            <span>
              <FontAwesomeIcon icon={faCloudRain} />&nbsp;&nbsp;
              {hourlyForecasts[active].rain["1h"]}
            </span>            
            <span>
              <FontAwesomeIcon icon={faLocationArrow} />
              &nbsp; {hourlyForecasts[active].wind_speed} m/s
            </span>
          </div>
          <div>
            <span>Humidity: {hourlyForecasts[active].humidity} %</span>
            <span>
              <FontAwesomeIcon icon={faGaugeHigh} />&nbsp;&nbsp;
              {weatherData.current.pressure} hPa
            </span>
            <span>UV: {hourlyForecasts[active].uvi}</span>
          </div>
          <div>
            <span>Dew point: {hourlyForecasts[active].dew_point}</span>
            <span>
              Visibility: {props.mToKM(hourlyForecasts[active].visibility)} KMs
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
