import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const fallbackLng = ["en"];

i18n
  .use(HttpBackend) // used to load data from other directory
  .use(LanguageDetector) // detects the current language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng, // default language
    detection: {
      order: ["querystring", "navigator", "htmlTag", "path", "subdomain"], // Order of detection methods
      caches: ["localStorage", "cookie"], // Cache detected language
      checkWhitelist: true,
    },
    debug: false,
    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
    backend: {
      loadPath: "locales/{{lng}}/{{ns}}.json", // Path to the json files
    },
  });

export default i18n;
