import React from "react";
import "../users/styles/seat_legend.css";

const SeatLegend: React.FC = () => {
  return (
    <div className="seat-legend">
      <div className="legend-item">
        <div className="seat available" /> Available
      </div>
      <div className="legend-item">
        <div className="seat selected" /> Selected
      </div>
      <div className="legend-item">
        <div className="seat sold" /> Sold
      </div>
    </div>
  );
};

export default SeatLegend;
