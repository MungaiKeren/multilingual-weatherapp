import React from 'react';
import HomePage from './Pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.scss";
import "./i18n";
import { WeatherContextProvider } from './Components/Contexts/WeatherContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherContextProvider><HomePage /></WeatherContextProvider>} />
      </Routes>
    </Router>
  );
}

export default App;
