import React from "react";
import { SeatProps as SeatData } from "../interfaces/seats"; // alias to avoid name clash

interface SeatComponentProps {
  seat: SeatData;
  isSelected: boolean;
  onClick: () => void;
}

const Seat: React.FC<SeatComponentProps> = ({ seat, isSelected, onClick }) => {
  const className = `seat ${
    seat.status === "sold" ? "sold" : isSelected ? "selected" : "available"
  }`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={seat.status === "sold"}
    >
      {seat.id}
    </button>
  );
};

export default Seat;
