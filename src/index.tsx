import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShowtimePage from "./pages/ShowtimePage"; // Your Showtime page
import MoviesPage from "./pages/MoviesPage";
import SeatBooking from "./pages/SeatBookingPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Define Landing Page */}
        <Route path="/movies" element={<MoviesPage />} />{" "}
        {/* Define Movies Page */}
        <Route path="/cinemas" element={<ShowtimePage />} />{" "}
        {/* Navigate to Showtime */}
        <Route path="/register" element={<RegisterPage />} />{" "}
        {/* Define Register Page */}
        <Route path="/login" element={<LoginPage />} />{" "}
        {/* Define Register Page */}
        <Route path="/booking" element={<SeatBooking />} />{" "}
        {/* Define Seat Booking Page */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
