"use client";

import type React from "react";
import { useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import "../styles/seat_booking_page.css";

interface SeatProps {
  id: string;
  status: "available" | "sold" | "selected";
}

const SeatBooking: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("SELECT SEATS");

  // Generate 50 seats (5 rows x 10 columns)
  const generateSeats = (): SeatProps[] => {
    const rows = ["A", "B", "C", "D", "E"];
    const seats: SeatProps[] = [];

    // Pre-define some sold seats
    const soldSeats = ["A3", "A7", "B5", "C2", "C8", "D4", "D9", "E1", "E6"];

    rows.forEach((row) => {
      for (let i = 1; i <= 10; i++) {
        const seatId = `${row}${i}`;
        const status = soldSeats.includes(seatId)
          ? "sold"
          : selectedSeats.includes(seatId)
          ? "selected"
          : "available";

        seats.push({ id: seatId, status });
      }
    });

    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatId: string) => {
    // Find the seat
    const seat = seats.find((s) => s.id === seatId);

    // If seat is sold, do nothing
    if (seat?.status === "sold") return;

    // Toggle selection
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatColor = (status: string): string => {
    switch (status) {
      case "available":
        return "seat-available";
      case "sold":
        return "seat-sold";
      case "selected":
        return "seat-selected";
      default:
        return "seat-available";
    }
  };

  return (
    <div className="seat-booking-container">
      {/* Header */}
      <header className="booking-header">
        <div className="header-left">
          <ChevronLeft className="back-icon" />
          <img
            src="https://via.placeholder.com/120x40/000000/FF0000?text=TGV"
            alt="TGV Cinemas"
            className="logo-image"
          />
        </div>

        <div className="progress-indicator">
          <div className="progress-step active">
            <div className="step-number">1</div>
            <div className="step-line"></div>
          </div>
          <div className="progress-step">
            <div className="step-number">2</div>
            <div className="step-line"></div>
          </div>
          <div className="progress-step">
            <div className="step-number">3</div>
          </div>
        </div>

        <div className="close-button">
          <X size={24} />
        </div>
      </header>

      {/* Booking Tabs */}
      <div className="booking-tabs">
        <div
          className={`booking-tab ${
            activeTab === "SELECT SEATS" ? "active" : ""
          }`}
          onClick={() => setActiveTab("SELECT SEATS")}
        >
          SELECT SEATS
        </div>
        <div
          className={`booking-tab ${
            activeTab === "FOOD & DRINKS" ? "active" : ""
          }`}
          onClick={() => setActiveTab("FOOD & DRINKS")}
        >
          FOOD & DRINKS
        </div>
        <div
          className={`booking-tab ${
            activeTab === "CHECKOUT & PAYMENT" ? "active" : ""
          }`}
          onClick={() => setActiveTab("CHECKOUT & PAYMENT")}
        >
          CHECKOUT & PAYMENT
        </div>
      </div>

      {/* Showtime Info */}
      <div className="showtime-info">
        <div className="time">12:30 AM</div>
        <div className="date">28 Mar 2025</div>
      </div>

      {/* Seat Legend */}
      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-icon seat-selected"></div>
          <div className="legend-text">SELECTED</div>
        </div>
        <div className="legend-item">
          <div className="legend-icon seat-sold"></div>
          <div className="legend-text">SOLD</div>
        </div>
        <div className="legend-item">
          <div className="legend-icon seat-available"></div>
          <div className="legend-text">SINGLE</div>
        </div>
      </div>

      {/* Screen */}
      <div className="screen-container">
        <div className="screen">SCREEN</div>
      </div>

      {/* Seating Layout */}
      <div className="seating-layout">
        {/* Row Labels */}
        <div className="row-labels">
          {["A", "B", "C", "D", "E"].map((row) => (
            <div key={row} className="row-label">
              {row}
            </div>
          ))}
        </div>

        {/* Seats */}
        <div className="seats-container">
          {["A", "B", "C", "D", "E"].map((row) => (
            <div key={row} className="seat-row">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((col) => {
                const seatId = `${row}${col}`;
                const seat = seats.find((s) => s.id === seatId);
                return (
                  <div
                    key={seatId}
                    className={`seat ${getSeatColor(
                      seat?.status || "available"
                    )}`}
                    onClick={() => handleSeatClick(seatId)}
                  >
                    <div className="seat-icon"></div>
                    <div className="seat-number">{col}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Row Labels (Right) */}
        <div className="row-labels">
          {["A", "B", "C", "D", "E"].map((row) => (
            <div key={`right-${row}`} className="row-label">
              {row}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats Summary */}
      <div className="selected-seats-summary">
        <div className="summary-text">
          YOUR SEAT(S): {selectedSeats.join(", ") || "None selected"}
        </div>
        <button className="book-button" disabled={selectedSeats.length === 0}>
          BOOK SEAT(S)
        </button>
      </div>
    </div>
  );
};

export default SeatBooking;
