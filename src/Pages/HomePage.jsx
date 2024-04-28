import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../Components/Contexts/WeatherContext";

import Header from "../Components/Header";
import HourlyForecast from "../Components/HourlyForecast";
import TendayForecast from "../Components/TendayForecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTemperatureThreeQuarters,
  faCloudRain,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const { t } = useTranslation();
  const lng = navigator.language;

  const { weatherData, error } = useContext(WeatherContext);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  function formatUnixTimestamp(timestamp) {
    // Convert Unix timestamp to milliseconds
    const milliseconds = timestamp * 1000;

    // Create a new Date object
    const date = new Date(milliseconds);

    // Define months array
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

    // Get date components
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    // Format the date
    const formattedDate = `${month} ${day}, ${hours}:${minutes}${ampm}`;

    return formattedDate;
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      {console.log(weatherData)}
      <Header />

      <div className="container card my-5">
        <ToastContainer />
        <div className="row p-3">
          <div className="col-md-5">
            {weatherData ? (
              <div className="top">
                <p className="text-danger">
                  {formatUnixTimestamp(weatherData?.current.dt)}
                </p>
                <h5>
                  <FontAwesomeIcon
                    className="text-muted"
                    icon={faLocationDot}
                  />
                  &nbsp;&nbsp;
                  <span className="text-muted">Nairobi, Kenya</span>
                </h5>
              </div>
            ) : (
              <Loading />
            )}

            <div className="summary-box">
              {weatherData ? (
                <div className="temp">
                  <h1>
                    <img
                      src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
                      alt=""
                    />
                    {Math.trunc(weatherData.current.temp)}&deg;
                  </h1>
                  <p className="text-bold">
                    {" "}
                    Feels like {Math.trunc(weatherData.current.feels_like)}&deg;
                    &nbsp;
                    {capitalize(weatherData.current.weather[0].description)}
                    .&nbsp;
                    {weatherData.current.wind_speed < 1.0
                      ? "Calm"
                      : weatherData.current.wind_speed >= 6.0
                      ? "Windy"
                      : "Breezy"}
                  </p>
                </div>
              ) : (
                <Loading />
              )}
              <div className="other">
                <span>
                  <FontAwesomeIcon icon={faCloudRain} />{" "}
                  {weatherData?.current.rain["1h"]}
                </span>
                <span>
                  <FontAwesomeIcon icon={faLocationArrow} />
                  {weatherData?.current.wind_speed} m/s
                </span>
                <span>Humidity: {weatherData?.current.humidity} %</span>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <HourlyForecast />
            <br />
            <TendayForecast />
            <br />
            <div className="div2equal">
              <div className="box-item">
                <p>
                  <FontAwesomeIcon icon={faTemperatureThreeQuarters} /> UV Index
                </p>
                <p>3</p>
                <p>Moderate</p>
                <p>Sun protection till 1600</p>
              </div>

              <div className="box-item">
                <p>
                  <FontAwesomeIcon icon={faTemperatureThreeQuarters} /> UV Index
                </p>
                <p>3</p>
                <p>Moderate</p>
                <p>Sun protection till 1600</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const BoxItem = (props) => {
  return (
    <>
      {props.temp ? (
        <div className="box">
          <p>
            <FontAwesomeIcon icon={props.icon} /> {props.aspect}
          </p>
          <p>{props.temp}</p>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
