import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShowtimePage from "./pages/ShowtimePage"; // Your Showtime page

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Define Landing Page */}
        <Route path="/movies" element={<LoginPage />} />{" "}
        {/* Example Movies Page */}
        <Route path="/cinemas" element={<ShowtimePage />} />{" "}
        {/* Navigate to Showtime */}
        <Route path="/register" element={<RegisterPage />} />{" "}
        {/* Define Register Page */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
