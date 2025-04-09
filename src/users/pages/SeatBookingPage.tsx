"use client";

import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockMovies, mockSeats } from "../../data/mockData";
import ScreenHeader from "../../components/ScreenHeader";
import Seat from "../../components/Seat";
import SeatLegend from "../../components/SeatLegend";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../styles/seat_booking.css";

const SeatBookingPage = () => {
  const { id } = useParams(); // movie ID
  const [searchParams] = useSearchParams(); // ✅ Destructure correctly

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const cinema = searchParams.get("cinema");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  const showtime = mockSeats.find(
    (s) =>
      s.movieId === Number(id) &&
      s.cinema === cinema &&
      s.date === date &&
      s.time === time
  );

  const handleToggle = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };
  const movie = mockMovies.find((m) => m.id === Number(id));

  if (!movie || !showtime) {
    return (
      <>
        <Navbar />
        <div className="not-found">Showtime not found.</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="seat-booking-container">
        <ScreenHeader
          movieTitle={movie.title}
          cinema={showtime.cinema}
          date={showtime.date}
          time={showtime.time}
        />

        <SeatLegend />

        <div className="seat-grid">
          {showtime.seats.map((seat) => (
            <Seat
              key={seat.id}
              seat={seat}
              isSelected={selectedSeats.includes(seat.id)}
              onClick={() =>
                seat.status === "available" ? handleToggle(seat.id) : null
              }
            />
          ))}
        </div>

        <div className="bottom-bar">
          <div className="summary">
            <span>🎟️ {selectedSeats.length} Seat(s) Selected</span>
            <button
              className="confirm-btn"
              disabled={!selectedSeats.length}
              onClick={() => alert("Booking Confirmed!")}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SeatBookingPage;
