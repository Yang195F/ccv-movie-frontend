import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/checkout_page.css";
import TimeoutPopup from "../../components/Timeout_Popup";
import SuccessPopup from "../../components/Success_Popup";
import { DisplayTicket } from "../../interfaces/displayTicket";

const CheckoutPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(300);
  const [ticket, setTicket] = useState<DisplayTicket | null>(null);
  const [showTimeout, setShowTimeout] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {
    screeningId,
    movie,
    banner,
    cinemaName,
    roomName,
    date,
    time,
    seats = [],
    pricePerTicket,
  } = state || {};

  const { title: movieTitle, duration, genre, rating } = movie || {};
  const totalPrice = seats.length * pricePerTicket;

  useEffect(() => {
    if (!timer || ticket) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) setShowTimeout(true);
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, ticket]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleConfirm = () => {
    setIsProcessing(true);

    const displayTicket: DisplayTicket = {
      ticketId: Math.random().toString(36).substring(2),
      movieTitle,
      cinemaName,
      roomName,
      date,
      time,
      seats,
      totalPrice,
    };

    setTicket(displayTicket);
    setShowSuccessPopup(true);
    setIsProcessing(false);
  };

  if (!state) return <p>No booking information provided.</p>;

  return (
    <div className="checkout-wrapper">
      <div
        className="checkout-banner"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="progress-indicator">
          <div className="progress-step">1</div>
          <div className="progress-line"></div>
          <div className="progress-step active">2</div>
        </div>

        <div className="banner-overlay">
          <h1 className="checkout-movie-title">{movieTitle}</h1>
          <p>{cinemaName} | {roomName}</p>
          <p>{date} at {time}</p>
        </div>
      </div>

      <div className="checkout-body">
        <h2>Booking Summary</h2>
        <p><strong>Seats:</strong> {seats.join(", ")}</p>
        <p><strong>Tickets:</strong> {seats.length}</p>
        <p><strong>Total:</strong> RM {totalPrice.toFixed(2)}</p>
        <p className="countdown">⏳ Time Left: {formatTime(timer)}</p>

        <button
          className="confirm-button"
          onClick={handleConfirm}
          disabled={isProcessing}
        >
          {isProcessing
            ? "Processing..."
            : `Confirm & Pay RM ${totalPrice.toFixed(2)}`}
        </button>
      </div>

      {showTimeout && (
        <TimeoutPopup
          message="⏰ Timeout! Please book again."
          onClose={() => navigate("/")}
        />
      )}

      {showSuccessPopup && ticket && (
        <SuccessPopup
          ticketId={ticket.ticketId}
          movieTitle={ticket.movieTitle}
          cinemaName={ticket.cinemaName}
          roomName={ticket.roomName}
          date={ticket.date}
          time={ticket.time}
          seats={ticket.seats}
          totalPrice={ticket.totalPrice}
          onDone={() => {
            setShowSuccessPopup(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
