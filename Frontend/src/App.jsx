import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CountriesProvider } from "./context/CountriesContext";
import Home from "./pages/Home";
import CountryDetails from "./components/countries/CountryDetails";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CountriesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryDetails />} />
          </Routes>
        </CountriesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
