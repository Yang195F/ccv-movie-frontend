import { FC } from "react";
import { SeatProps as SeatData } from "../interfaces/seats"; // alias to avoid name clash
import "../users/styles/seat.css"; // Assuming you have a CSS file for styling

interface SeatComponentProps {
  seat: SeatData;
  isSelected: boolean;
  onClick: () => void;
}

const Seat: FC<SeatComponentProps> = ({ seat, isSelected, onClick }) => {
  const getClassName = () => {
    if (seat.status === "sold") return "seat-icon sold";
    if (isSelected) return "seat-icon selected";
    return "seat-icon available";
  };

  return (
    <div className="seat-wrapper" onClick={onClick}>
      <img
        src={"../assets/icons/seat.svg"}
        alt="Seat Icon"
        className={getClassName()}
      />
    </div>
  );
};

export default Seat;
