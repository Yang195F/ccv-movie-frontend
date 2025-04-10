import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { mockMovies, mockSeats } from "../../data/mockData";
import Seat from "../../components/Seat";
import SeatLegend from "../../components/SeatLegend";
import ScreenHeader from "../../components/ScreenHeader";
import "../styles/seat_booking.css";

const SeatBookingPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const selectedDate = searchParams.get("date") ?? "";
  const selectedTime = searchParams.get("time") ?? "";
  const cinemaName = searchParams.get("cinema") ?? "";

  const movie = mockMovies.find((m) => m.id === Number(id));

  const showtime = mockSeats.find(
    (s) =>
      s.movieId === Number(id) &&
      s.cinema === cinemaName &&
      s.date === selectedDate &&
      s.time === selectedTime
  );

  const matchedSession = movie?.screenings
    ?.find((screening) => screening.cinema === cinemaName)
    ?.sessions?.find(
      (session) =>
        session.date === selectedDate && session.time === selectedTime
    );

  const roomName = matchedSession?.roomId ?? "Room Unknown";

  const handleToggle = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  if (!movie || !showtime) {
    return <div className="not-found">Showtime not found.</div>;
  }

  return (
    <div className="booking-root">
      <div
        className="booking-banner"
        style={{ backgroundImage: `url(${movie.banner})` }}
      >
        <div className="booking-overlay">
          <div className="booking-header">
            <img src="/logo.svg" alt="Logo" className="booking-logo" />
            <div className="booking-steps">
              <span className="step active">1. SELECT SEATS</span>
              <span className="step">2. CHECKOUT</span>
            </div>
          </div>
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <p>
              {movie.genre} | {movie.duration} | {movie.languages.join(", ")}
            </p>
            <p>
              {cinemaName} | {roomName} | {selectedDate} {selectedTime}
            </p>
          </div>
        </div>
      </div>

      <div className="seat-section">
        <div className="screen-curve">SCREEN</div>

        <ScreenHeader
          movieTitle={movie.title}
          cinema={cinemaName}
          date={selectedDate}
          time={selectedTime}
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
      </div>

      <div className="booking-footer">
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
  );
};

export default SeatBookingPage;
