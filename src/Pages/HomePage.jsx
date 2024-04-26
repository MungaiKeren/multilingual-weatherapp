import React from "react";
import Header from "../Components/Header";
import { useTranslation } from "react-i18next";


export default function HomePage() {
  const { t } = useTranslation();
  const lng = navigator.language;

  return (
    <>
      <Header />
      <h1>{t("hello")}</h1>
      <p>{t("cancel")}</p>
      <p>{t("continue")}</p>

      <p>Browser Language: {lng}</p>
    </>
  );
};