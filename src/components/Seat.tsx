// components/Seat.tsx
import { FC } from "react";
import { SeatProps as SeatData } from "../interfaces/seats";
import "../users/styles/seat.css";

interface SeatComponentProps {
  seat: SeatData;
  isSelected: boolean;
  onClick: () => void;
}

const Seat: FC<SeatComponentProps> = ({ seat, isSelected, onClick }) => {
  const getClassName = () => {
    if (seat.status === "sold") return "seat-box sold";
    if (isSelected) return "seat-box selected";
    return "seat-box available";
  };

  return (
    <div className={getClassName()} onClick={onClick}>
      {seat.id}
    </div>
  );
};

export default Seat;
