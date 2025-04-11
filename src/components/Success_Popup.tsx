import React from "react";
import "../users/styles/success_popup.css";

interface SuccessPopupProps {
  ticketId: string;
  movieTitle: string;
  cinemaName: string;
  roomName: string;
  date: string;
  time: string;
  seats: string[];
  totalPrice: number;
  onDone: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  ticketId,
  movieTitle,
  cinemaName,
  roomName,
  date,
  time,
  seats,
  totalPrice,
  onDone,
}) => {
  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <h2>🎟️ Booking Confirmed!</h2>
        <div className="ticket-card">
          <p>
            <strong>Movie:</strong> {movieTitle}
          </p>
          <p>
            <strong>Cinema:</strong> {cinemaName}
          </p>
          <p>
            <strong>Room:</strong> {roomName}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <p>
            <strong>Seats:</strong> {seats.join(", ")}
          </p>
          <p>
            <strong>Total Paid:</strong> RM {totalPrice.toFixed(2)}
          </p>
          <p>
            <strong>Ticket ID:</strong> {ticketId}
          </p>
        </div>
        <button className="confirm-button" onClick={onDone}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
