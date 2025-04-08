"use client";
import React, { useState } from "react";
import "../styles/seat_booking.css";

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const soldSeats = ["B2", "C3"]; // Simulate sold seats

  const rows = ["A", "B", "C", "D"];
  const columns = [1, 2, 3, 4, 5];

  const toggleSeat = (seatId: string) => {
    if (soldSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="seat-booking-container">
      {/* Header */}
      <div className="booking-header">
        <h2>BLOOD BROTHERS: BARA NAGA</h2>
        <p>Action, Drama | 2 hr 9 mins | Bahasa Melayu</p>
        <p>📍 1 UTAMA | 🎞️ INDULGE 2 | 🗓️ 9 Apr 2025, 12:30 PM</p>
      </div>

      {/* Showtime Selector (Simulated) */}
      <div className="showtime-buttons">
        {["12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM", "11:45 PM"].map(
          (time) => (
            <button key={time} className="showtime-btn">
              {time}
            </button>
          )
        )}
      </div>

      {/* Legend */}
      <div className="legend-bar">
        <span className="legend selected">🟩 Selected</span>
        <span className="legend sold">🟥 Sold</span>
        <span className="legend single">🟪 Single</span>
        <span className="legend twin">🟪 Twin</span>
      </div>

      {/* Screen Indicator */}
      <div className="screen-view">SCREEN</div>

      {/* Seat Grid */}
      <div className="seat-grid">
        {rows.map((row) => (
          <div key={row} className="seat-row">
            {columns.map((col) => {
              const seatId = `${row}${col}`;
              const isSold = soldSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              return (
                <button
                  key={seatId}
                  className={`seat ${isSold ? "sold" : ""} ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => toggleSeat(seatId)}
                >
                  {seatId}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Book Button */}
      <button className="book-btn">BOOK SEAT(S)</button>
    </div>
  );
};

export default SeatBooking;
