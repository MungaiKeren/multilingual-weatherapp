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
import { useTranslation } from "react-i18next";

export default function DailyForecast(props) {
  const { weatherData, error } = useContext(WeatherContext);

  const { t } = useTranslation();
  const dailyForecasts = weatherData?.daily;
  const [active, setActive] = useState(1)

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

  function formatTime(timestamp) {
    // Convert Unix timestamp to milliseconds
    const milliseconds = timestamp * 1000;
  
    // Create a new Date object
    const date = new Date(milliseconds);
  
    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Determine AM or PM
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    hours = hours % 12 || 12;
  
    // Format the time
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
  
    return formattedTime;
  }

  return (
    <div className="daily-forecast">
      <h4>
        <FontAwesomeIcon icon={faCalendarDay} /> {t("8-days")}
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
                  onClick={() => setActive(isActive ? null : index)}
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
                    <FontAwesomeIcon icon={active ? faCaretUp : faCaretDown} />
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
                          {props.capitalize(forecast.weather[0].description)}.{" "}
                          {forecast.wind_speed < 1.0
                            ? "Calm"
                            : forecast.wind_speed >= 6.0
                            ? "Windy"
                            : "Light Breeze"}
                        </p>
                        <p>
                          The High will be {Math.trunc(forecast.temp.max)}
                          &deg;C, the low will be{" "}
                          {Math.trunc(forecast.temp.min)}&deg;C
                        </p>
                      </div>
                    </div>
                    <div className="details mt-2 mb-2">
                      <div>
                        <span>
                          <FontAwesomeIcon icon={faCloudRain} />
                          &nbsp;&nbsp;
                          {forecast.rain} mm
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faLocationArrow} />
                          &nbsp; {forecast.wind_speed} m/s
                        </span>
                        <span>{t("Humidity")}: {forecast.humidity} %</span>
                      </div>
                      <div>
                        <span>
                          <FontAwesomeIcon icon={faGaugeHigh} />
                          &nbsp;&nbsp;
                          {weatherData.current.pressure} hPa
                        </span>
                        <span>UV: {forecast.uvi}</span>
                        <span>{t("Dew")}: {forecast.dew_point}</span>
                      </div>
                    </div>

                    <div className="feels-like mt-2">
                      <div>
                        <p>*</p>
                        <p className="text-muted">TEMP</p>
                        <p className="text-muted">FEELS LIKE</p>
                      </div>
                      <div>
                        <p>Morning</p>
                        <p>{Math.trunc(forecast.temp.morn)}&deg;C</p>
                        <p>{Math.trunc(forecast.feels_like.morn)}&deg;C</p>
                      </div>
                      <div>
                        <p>Afternoon</p>
                        <p>{Math.trunc(forecast.temp.day)}&deg;C</p>
                        <p>{Math.trunc(forecast.feels_like.day)}&deg;C</p>
                      </div>
                      <div>
                        <p>Evening</p>
                        <p>{Math.trunc(forecast.temp.eve)}&deg;C</p>
                        <p>{Math.trunc(forecast.feels_like.eve)}&deg;C</p>
                      </div>
                      <div>
                        <p>Night</p>
                        <p>{Math.trunc(forecast.temp.night)}&deg;C</p>
                        <p>{Math.trunc(forecast.feels_like.night)}&deg;C</p>
                      </div>
                    </div>

                    <div className="sun-status mt-3">
                      <div>
                        <p className="text-muted">{t("Sunrise")}</p>
                        <p>{formatTime(forecast.sunrise)}</p>
                      </div>
                      <div>
                        <p className="text-muted" >{t("Sunset")}</p>
                        <p>{formatTime(forecast.sunset)}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                )}
              </>
            );
          })
        ) : error ? (
          <p className="text-danger">
            {t("Error")}
          </p>
        ) : (
          <Loading />
        )}
      </div>
      <hr />
    </div>
  );
}
