import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCloud } from "@fortawesome/free-solid-svg-icons";

export default function TendayForecast() {
    return(
        <div className="forecast">
              <h4><FontAwesomeIcon icon={faClock} /> 10 Day Forecast</h4>
              <hr />
              <div className="item">
                <div className="itm active">
                  <p>Today</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Thu</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Fri</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Sat</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Sun</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className="itm">
                  <p>Mon</p>
                  <p>28 &deg;</p>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
              </div>
              <hr />
            </div>
    )
}