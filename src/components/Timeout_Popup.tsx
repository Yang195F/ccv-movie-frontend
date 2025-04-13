// components/TimeoutPopup.tsx
import React from "react";
import "../users/styles/timeout_popup.css";

interface TimeoutPopupProps {
  onClose: () => void;
  message: string;
}

const TimeoutPopup: React.FC<TimeoutPopupProps> = ({
  onClose,

  message,
}) => {
  return (
    <div className="timeout-popup-backdrop">
      <div className="timeout-popup-container">
        <h2>⏳ Time’s Up!</h2>
        <p>Your booking session has expired. Please book again.</p>
        <div className="timeout-popup-controls">
          <button className="confirm-button" onClick={onClose}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeoutPopup;
