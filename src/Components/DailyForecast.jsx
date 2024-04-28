import React, { useContext } from "react";
import { WeatherContext } from "./Contexts/WeatherContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCalendarDay,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

export default function DailyForecast() {
  const { weatherData, error } = useContext(WeatherContext);
  const dailyForecasts = weatherData?.daily;

  function formatDate(timestamp) {
    // Convert Unix timestamp to milliseconds
    const milliseconds = timestamp * 1000;

    // Create a new Date object
    const date = new Date(milliseconds);

    // Define days and months arrays
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

    // Get day of the week, month, and day
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();

    // Format the date
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
            const isActive = index === 0;
            return (
              <div className={`itm ${isActive ? "active" : ""}`} key={index}>
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
