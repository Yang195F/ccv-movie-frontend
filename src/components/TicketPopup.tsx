import React from "react";
import "../users/styles/ticket_popup.css";

interface TicketPopUpProps {
  movieTitle: string;
  banner: string;
  cinemaName: string;
  roomName: string;
  date: string;
  time: string;
  seats: string[];
  pricePerTicket: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const TicketConfirmationPopup: React.FC<TicketPopUpProps> = ({
  movieTitle,
  banner,
  cinemaName,
  roomName,
  date,
  time,
  seats,
  pricePerTicket,
  onConfirm,
  onCancel,
}) => {
  const totalPrice = pricePerTicket * seats.length;

  return (
    <div className="ticket-popup-backdrop">
      <div className="ticket-popup-container">
        <div
          className="ticket-popup-banner"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="ticket-banner-overlay">
            <button className="popup-close-btn" onClick={onCancel}>
              ×
            </button>
            <h2 className="ticket-popup-movie-title">{movieTitle}</h2>
            <p>
              {cinemaName} {roomName}
            </p>
            <p>
              Date:{date} | Time:{time}
            </p>
          </div>
        </div>

        <div className="ticket-popup-body">
          <div className="ticket-info">
            <p className="ticket-type"></p>
            <p>RM insert price here</p>
            <p>Seats: {seats.join(", ")}</p>
            <p>Number of Seats: {seats.length}</p>
            <p>
              <strong>Total Amount: RM total price here</strong>
            </p>
          </div>

          <div className="popup-controls">
            <button className="edit-button" onClick={onCancel}>
              ✏️ Edit Seat
            </button>
            <button
              type="button"
              className="confirm-button"
              onClick={onConfirm}
            >
              ADD TO CART – RM {totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmationPopup;
