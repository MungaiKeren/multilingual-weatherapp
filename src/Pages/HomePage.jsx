import React, { useContext} from "react";
import Header from "../Components/Header";
import HourlyForecast from "../Components/HourlyForecast";
import TendayForecast from "../Components/TendayForecast";
import { useTranslation } from "react-i18next";
import { WeatherContext } from "./WeatherContext";
import { WeatherProvider } from "./WeatherContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLocationDot, 
  faTemperatureThreeQuarters} from "@fortawesome/free-solid-svg-icons";


export default function HomePage() {
  const { t } = useTranslation();
  const lng = navigator.language;

  const  weatherData = useContext(WeatherContext);
  const  loading = useContext(WeatherContext);
  const  error = useContext(WeatherContext);


  return (
    <WeatherProvider>
      <Header />

      <div className="container card my-5">
        <div className="row p-3">
          <div className="col-md-5">
            <div className="top">
              <h5><FontAwesomeIcon className="text-muted" icon={faLocationDot} />&nbsp;
                <span className="text-muted">Nairobi, Kenya</span></h5>
            </div>
            {console.log("Weather data:", weatherData)}
            {console.log("Loading:", loading)}
            {console.log("Error:", error)}
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
    </WeatherProvider>
  );
};