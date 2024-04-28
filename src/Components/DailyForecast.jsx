import React, { useContext, useState } from "react";
import { WeatherContext } from "./Contexts/WeatherContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCaretDown,
  faCaretUp,
  faCloudRain,
  faLocationArrow,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

export default function DailyForecast(props) {
  const { weatherData, error } = useContext(WeatherContext);

  const dailyForecasts = weatherData?.daily;
  const [active, setActive] = useState(null);

  function formatDate(timestamp) {
    const milliseconds = timestamp * 1000;

    const date = new Date(milliseconds);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();

    const formattedDate = `${dayOfWeek}, ${month} ${day}`;

    return formattedDate;
  }

  return (
    <div className="daily-forecast">
      {console.log(dailyForecasts)}
      <h4>
        <FontAwesomeIcon icon={faCalendarDay} /> 8-Day Forecast
      </h4>
      <hr />

      <div className="item">
        {dailyForecasts ? (
          dailyForecasts &&
          dailyForecasts.map((forecast, index) => {
            const forecastTime = formatDate(forecast.dt);
            const isActive = active === index;
            return (
              <>
              <div 
                className={`itm ${isActive ? "active" : ""}`} 
                key={index}
                onClick={() => setActive(index)}
              >
                <p>{forecastTime}</p>
                <p>
                  <img
                    src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                    alt=""
                  />{" "}
                  {Math.trunc(forecast.temp.max)}/
                  {Math.trunc(forecast.temp.min)}&deg;C
                </p>
                <div className="div1auto">
                  <p className="small-font">
                    {forecast.weather[0].description}
                  </p>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
              {isActive && (
                <div className="additional-details">
                  <div className="d-flex">
                    <img 
                      src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} 
                      alt=""
                    />
                    <div>
                      <p>
                        {props.capitalize(forecast.weather[0].description)}. {" "}
                        {forecast.wind_speed < 1.0
                          ? "Calm"
                          : forecast.wind_speed >= 6.0
                          ? "Windy"
                          : "Light Breeze"}
                      </p>
                      <p>The High will be {Math.trunc(forecast.temp.max)}&deg;C, the low will be {Math.trunc(forecast.temp.min)}&deg;C</p>
                    </div>
                  </div>
                  <div className="details mt-2 mb-2">
                    <div>
                      <span>
                        <FontAwesomeIcon icon={faCloudRain} />&nbsp;&nbsp;
                        {forecast.rain} mm
                      </span>            
                      <span>
                        <FontAwesomeIcon icon={faLocationArrow} />
                        &nbsp; {forecast.wind_speed} m/s
                      </span>
                      <span>Humidity: {forecast.humidity} %</span>
                    </div>
                    <div>                      
                      <span>
                        <FontAwesomeIcon icon={faGaugeHigh} />&nbsp;&nbsp;
                        {weatherData.current.pressure} hPa
                      </span>
                      <span>UV: {forecast.uvi}</span>
                      <span>Dew point: {forecast.dew_point}</span>
                    </div>
                </div>
                </div>
              )}
              </>
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
    </div>
  );
}
