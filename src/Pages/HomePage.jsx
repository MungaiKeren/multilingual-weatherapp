import React, { useContext, useEffect} from "react";
import { WeatherContext } from "../Components/Contexts/WeatherContext";

import Header from "../Components/Header";
import HourlyForecast from "../Components/HourlyForecast";
import TendayForecast from "../Components/TendayForecast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Components/Loading";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLocationDot, 
  faTemperatureThreeQuarters} from "@fortawesome/free-solid-svg-icons";


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
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Get date components
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    // Format the date
    const formattedDate = `${month} ${day}, ${hours}:${minutes}${ampm}`;
  
    return formattedDate;
  }



  return (
    <>
    {console.log(weatherData)}
      <Header />

      <div className="container card my-5">
        <ToastContainer />
        <div className="row p-3">
          <div className="col-md-5"><Loading />
            {weatherData ? (
              <div className="top">
                <p className="text-danger">{formatUnixTimestamp(weatherData?.current.dt)}</p>
                <h5><FontAwesomeIcon className="text-muted" icon={faLocationDot} />&nbsp;&nbsp;
                  <span className="text-muted">Nairobi, Kenya</span></h5>
              </div>
              )
              : (<Loading />)}
            
            <div className="summary-box">
              <div className="temp text-center">
                <h1>28&deg;</h1>
                <p className="fs-5">Rainy Day</p>
                <p className="small">Today, expect a rainy day with temperatures reaching a maximum of 28&deg;C. Make sure to grab your umbrella and raincoat before heading out.</p>
              </div>
              <div className="other">
                <div className="box">
                  <p><FontAwesomeIcon icon={faTemperatureThreeQuarters} /> Feels Like</p>
                  <p>30&deg;</p>
                  <p>Humidity is making it feel warmer</p>
                </div>
                <div className="box">
                  <p><FontAwesomeIcon icon={faTemperatureThreeQuarters} /> Feels Like</p>
                  <p>30&deg;</p>
                  <p>Humidity is making it feel warmer</p>
                </div>
                <div className="box">
                  <p><FontAwesomeIcon icon={faTemperatureThreeQuarters} /> Feels Like</p>
                  <p>30&deg;</p>
                  <p>Humidity is making it feel warmer</p>
                </div>
                <div className="box">
                  <p><FontAwesomeIcon icon={faTemperatureThreeQuarters} /> Feels Like</p>
                  <p>30&deg;</p>
                  <p>Humidity is making it feel warmer</p>
                </div>
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
                <p><FontAwesomeIcon icon={faTemperatureThreeQuarters} /> UV Index</p>
                <p>3</p>
                <p>Moderate</p>
                <p>Sun protection till 1600</p>
              </div>

              <div className="box-item">
                <p><FontAwesomeIcon icon={faTemperatureThreeQuarters} /> UV Index</p>
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
};