import React, { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import "../styles/BookingManagement.css";

const BookingManagement = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [seats, setSeats] = useState(generateSeats());

    interface Seat {
      status: "available" | "reserved" | "purchased";
      username: string;
    }
  
    function generateSeats(): Seat[][] {
      let seatLayout: Seat[][] = [];
      for (let i = 0; i < 5; i++) {
        let row: Seat[] = [];
        for (let j = 0; j < 10; j++) {
          row.push({ status: "available", username: "" });
        }
        seatLayout.push(row);
      }
      return seatLayout;
    }
  
    const handleSeatClick = (rowIndex: number, colIndex: number) => {
      let newSeats = [...seats];
      let seat = newSeats[rowIndex][colIndex];
      if (seat.status === "reserved") {
        if (window.confirm("Remove this reservation?")) {
          seat.status = "available";
          seat.username = "";
        }
      }
      setSeats(newSeats);
    };

  return (
    <div className="booking-management">
      <NavbarAdmin />
      <div className="controls">
        <select onChange={(e) => setSelectedMovie(e.target.value)}>
          <option>Select Movie</option>
          <option>Movie 1</option>
          <option>Movie 2</option>
        </select>
        <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
        <select onChange={(e) => setSelectedTime(e.target.value)}>
          <option>Select Time</option>
          <option>12:00 PM</option>
          <option>3:00 PM</option>
        </select>
      </div>
      <div className="seat-layout">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, colIndex) => (
              <div
                key={colIndex}
                className={`seat ${seat.status}`}
                onClick={() => handleSeatClick(rowIndex, colIndex)}
              >
                {seat.status === "reserved" ? seat.username : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingManagement;