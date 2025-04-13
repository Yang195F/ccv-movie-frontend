import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./users/pages/LandingPage";
import LoginPage from "./users/pages/LoginPage";
import RegisterPage from "./users/pages/RegisterPage";
import MoviesPage from "./users/pages/MoviesPage";
import SeatBooking from "./users/pages/SeatBookingPage";
import "./users/styles/global.css";
import MovieDetails from "./users/pages/MovieDetails";
import CheckoutPage from "./users/pages/CheckoutPage";
import TicketConfirmationPage from "./users/pages/ViewTicketPage";
import CinemasPage from "./users/pages/CinemasPage";
import AppLayout from "./components/AppLayout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />{" "}
          {/* Define Landing Page */}
          <Route path="/movies" element={<MoviesPage />} />{" "}
          {/* Define Movies Page */}
          <Route path="/register" element={<RegisterPage />} />{" "}
          {/* Define Register Page */}
          <Route path="/login" element={<LoginPage />} />{" "}
          {/* Define Register Page */}
          <Route path="/booking/:id" element={<SeatBooking />} />
          {/* Define Seat Booking Page */}
          <Route path="/movie/:id" element={<MovieDetails />} />
          {/* Define Movie Details Page */}
          <Route path="/showtimes/:cinemaId" element={<MoviesPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cinemas" element={<CinemasPage />} />
          <Route path="*" element={<LandingPage />} />{" "}
        </Routes>
      </AppLayout>
    </BrowserRouter>
  </React.StrictMode>
);
