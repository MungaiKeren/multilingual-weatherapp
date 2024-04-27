import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCloud } from "@fortawesome/free-solid-svg-icons";


export default function HourlyForecast() {
    return(
        <div className="forecast">
              <h4><FontAwesomeIcon icon={faClock} /> Hourly Forecast</h4>
              <hr />
              <div className="item">
                <div className="itm active">
                  <p>Now</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Now</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Now</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Now</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Now</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Now</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
              </div>
              <hr />
            </div>
    )
}