import React from "react";
import logo from "../logo.jpg";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };



  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a href="#" className="navbar-brand">
            <img src={logo} alt="logo" width="50" height="50" />
            Weather App
          </a>
          <div className="d-flex">
            <select
              className="form-select"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>
        </div>
      </nav>
    </>
  );
}
