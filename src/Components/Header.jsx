import React, { useEffect, useState } from "react";
import logo from "../logo.jpg";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);


  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a href="#" className="navbar-brand">
            <img src={logo} alt="logo" width="50" height="50" />
            {t("Title")}
          </a>
          <div className="d-flex">
            <select
              className="form-select"
              value={currentLanguage}
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
