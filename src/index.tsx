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
import EmailVerificationPage from "./users/pages/EmailVerificationPage";
import ForgotPasswordPage from "./users/pages/ForgotPasswordPage"
import VerifyResetCodePage from "./users/pages/VerifyResetCodePage"
import ResetPasswordPage from "./users/pages/ResetPasswordPage"
import TicketConfirmationPage from "./users/pages/ViewTicketPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movies" element={<MoviesPage />} />{" "}
        <Route path="/register" element={<RegisterPage />} />{" "}
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-reset" element={<VerifyResetCodePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/booking/:id" element={<SeatBooking />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/showtimes/:cinemaId" element={<MoviesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<LandingPage />} />{" "}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
