import React, { useContext, useEffect } from "react";
import { WeatherContext } from "../Components/Contexts/WeatherContext";

import Header from "../Components/Header";
import HourlyForecast from "../Components/HourlyForecast";
import DailyForecast from "../Components/DailyForecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCloudRain,
  faLocationArrow,
  faGaugeHigh
} from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const { t } = useTranslation();

  const { weatherData, error } = useContext(WeatherContext);

  useEffect(() => {
    if (error) {
      console.log(error.message);
      toast.error("Please Try again Later", {
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

  function mToKM(meters) {
    return (meters / 1000).toFixed(1); // Convert meters to kilometers with 2 decimal places
  }

  // const weatherDescription = capitalize(weatherData?.current.weather[0].description);

  return (
    <>
      <Header />
      <div className="container card my-5">
        <ToastContainer />
        <div className="row p-3">
          <div className="col-md-6">
            {weatherData ? (
              <div className="top">
                <p>
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
            ) : error ? (
              <p className="text-danger">{t("Error")}</p>
            ) : (
              <Loading />
            )}
  
            {weatherData && (
              <div className="summary-box">
                <div className="temp">
                  <h1>
                    <img
                      src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
                      alt=""
                    />
                    {Math.trunc(weatherData.current.temp)}&deg;
                  </h1>
                  <p className="text-bold">
                    {t("Feels-Like")} {Math.trunc(weatherData.current.feels_like)}&deg;
                    &nbsp;
                    {capitalize(weatherData?.current.weather[0].description)}
                    {/* {t("WeatherDescription", { weatherDescription: capitalize(weatherData?.current.weather[0].description) })} */}
                    .&nbsp;
                    {weatherData.current.wind_speed < 1.0
                      ? `${t("Calm")}`
                      : weatherData.current.wind_speed >= 6.0
                      ? `${t("Windy")}`
                      : `${t("Breezy")}`}
                  </p>
                </div>
                <div className="details">
                  <div>
                    {weatherData?.current.rain && <span>
                      <FontAwesomeIcon icon={faCloudRain} />{" "}
                      {weatherData?.current.rain["1h"]}
                    </span>}
                    <span>
                      <FontAwesomeIcon icon={faLocationArrow} />&nbsp;
                      {t("Wind")}: {weatherData?.current.wind_speed} m/s
                    </span>
                  </div>
                  <div>
                    <span>{t("Humidity")}: {weatherData?.current.humidity} %</span> 
                    <span><FontAwesomeIcon icon={faGaugeHigh} /> {t("Pressure")}:  {weatherData.current.pressure} hPa</span>
                    <span>UV: {weatherData?.current.uvi}</span>
                  </div>                  
                  <div>                    
                    <span>{t("Dew")}: {weatherData?.current.dew_point}</span> 
                    <span>{t("Visibility")}: {mToKM(weatherData?.current.visibility)} KMs</span>
                  </div>
                </div>
              </div>
            )}

            <br />
            <HourlyForecast mToKM={mToKM}/>
          </div>
  
          <div className="col-md-6 mt-4">
            <DailyForecast capitalize={capitalize} mToKM={mToKM}/>
          </div>
        </div>
      </div>
    </>
  );
  
}

