import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MoviesPage from "./pages/MoviesPage";
import SeatBooking from "./pages/SeatBookingPage";
import "./styles/global.css";
import MovieDetails from "./pages/MovieDetails";

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
        <Route path="/register" element={<RegisterPage />} />{" "}
        {/* Define Register Page */}
        <Route path="/login" element={<LoginPage />} />{" "}
        {/* Define Register Page */}
        <Route path="/booking" element={<SeatBooking />} />{" "}
        {/* Define Seat Booking Page */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
