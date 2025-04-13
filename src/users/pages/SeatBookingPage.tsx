import React, { useEffect, useMemo, useState } from "react";
import "../styles/seat_booking.css";
import { mockMovies } from "../../data/mockData";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { RoomTemplates } from "../../config/roomTemplate";
import SeatLegend from "../../components/SeatLegend";
import { v4 as uuidv4 } from "uuid"; // Install via npm if not already: npm install uuid
import { getLayoutTypeFromRoomId } from "../../utils/layoutUtils";
import TicketConfirmationPopup from "../../components/TicketPopup";

const SeatBookingPage: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCinema = searchParams.get("cinema");
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");
  const selectedRoom = searchParams.get("room");
  const roomId = searchParams.get("roomId");

  const seatGrid = useMemo(() => {
    const layout = getLayoutTypeFromRoomId(selectedRoom ?? "");
    return layout ? RoomTemplates[layout]?.generate() : [];
  }, [selectedRoom]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [ticket, setTicket] = useState<any | null>(null);
  const handleConfirm = () => {
    if (
      !selectedMovie ||
      !selectedCinema ||
      !selectedRoom ||
      !selectedDate ||
      !selectedTime
    )
      return;

    // Just pass everything needed — no Ticket object yet
    navigate("/checkout", {
      state: {
        movie: selectedMovie, // full movie object
        banner: selectedMovie.banner, // for background
        cinemaName: selectedCinema,
        roomName: selectedRoom,
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        pricePerTicket: 18,
      },
    });
  };

  useEffect(() => {
    console.log("PARAMS CHECK", {
      selectedRoom,
      selectedDate,
      selectedTime,
      selectedCinema,
    });
  }, [selectedRoom, selectedDate, selectedTime, selectedCinema]);

  const selectedMovie = mockMovies.find((m) => m.id === Number(id));
  const selectedScreening = selectedMovie?.screenings?.find(
    (s) => s.cinema === selectedCinema
  );
  const otherSessionsSameCinema = selectedScreening?.sessions?.filter(
    (sess) =>
      sess.date === selectedDate &&
      sess.time !== selectedTime && // exclude the current one
      sess.status !== "sold out"
  );

  const selectedSession =
    selectedScreening?.sessions?.find(
      (session) =>
        session.date === selectedDate && session.time === selectedTime
    ) ?? undefined;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const soldSeats = ["E1", "E2"];

  const handleSeatClick = (seat: string) => {
    if (soldSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const getSeatStatus = (seat: string) => {
    if (selectedSeats.includes(seat)) return "selected";
    if (soldSeats.includes(seat)) return "sold";
    return "available";
  };

  return (
    <div className="seat-booking-wrapper">
      {/* 🎬 Banner Section with Gradient Fade */}
      <div
        className="banner-section"
        style={{ backgroundImage: `url(${selectedMovie?.banner ?? ""})` }}
      >
        <div className="banner-overlay">
          <div className="booking-header">
            <div className="header-inner">
              <button className="back-button" onClick={() => navigate(-1)}>
                ←
              </button>

              <div className="header-center">
                <div className="progress-indicator">
                  <div className="progress-step active">1</div>
                  <div className="progress-line"></div>
                  <div className="progress-step inactive">2</div>
                </div>
              </div>

              <button className="close-button">×</button>
            </div>
          </div>

          {/* 📝 Dynamic Movie Info Section */}
          <section className="movie-info">
            <h1 className="movie-title">
              {selectedMovie?.title ?? "Movie Title"}
            </h1>
            <p className="movie-meta">
              {selectedMovie?.genre ?? "Genre"} |{" "}
              {selectedMovie?.duration ?? "Duration"} |{" "}
              {selectedMovie?.languages?.join(", ") ?? "Language"}
            </p>
            <div className="movie-details">
              <span className="detail-tag">{selectedCinema || "Cinema"}</span>

              <span className="detail-tag">
                {selectedRoom?.replace("room", "Room ") || "Room"}
              </span>

              <span className="detail-tag">
                {selectedDate || "Date"}, {selectedTime || "Time"}
              </span>
            </div>
            <h3 className="showtimes-label">
              Other Showtimes at {selectedCinema || "this cinema"}
            </h3>
            <div className="showtimes-container">
              {otherSessionsSameCinema?.length ? (
                otherSessionsSameCinema.map((session) => (
                  <button
                    key={session.time}
                    className="showtime-button"
                    onClick={() =>
                      navigate(
                        `/booking/${
                          selectedMovie?.id
                        }?cinema=${encodeURIComponent(
                          selectedCinema ?? ""
                        )}&date=${session.date}&time=${session.time}&room=${
                          session.roomId
                        }`
                      )
                    }
                  >
                    <div>{session.time}</div>
                    <div className="showtime-date">{session.date}</div>
                  </button>
                ))
              ) : (
                <div>No other showtimes available</div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* 🎟️ Booking Body Section */}
      <main className="booking-body">
        <SeatLegend />

        <div className="screen-container">
          <img
            src="/assets/icons/screen.jpg" // replace with actual path
            alt="Cinema Screen"
            className="screen-img"
          />
        </div>

        <section className="seats-container">
          <div className="seat-grid-table">
            {seatGrid.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="seat-row">
                {/* 🔠 Left row label */}
                <div className="label-cell row-label">{row[0].row}</div>

                {/* 🪑 Seats */}
                {row.map((seat) => (
                  <div key={seat.id} className="seat-cell">
                    <div
                      className={`seat-wrapper ${getSeatStatus(seat.id)}`}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      {seat.id}
                    </div>
                  </div>
                ))}

                {/* 🔠 Right row label */}
                <div className="label-cell row-label">{row[0].row}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="book-button-container">
          <p className="selected-seats-label">
            {selectedSeats.length > 0
              ? `Selected Seats: ${selectedSeats.join(", ")}`
              : "No Seats Selected"}
          </p>
          <button
            className="book-button"
            disabled={selectedSeats.length === 0}
            onClick={() => setIsConfirming(true)}
          >
            BOOK SEATS!
          </button>
        </div>
      </main>
      {isConfirming && selectedMovie && (
        <TicketConfirmationPopup
          movieTitle={selectedMovie.title}
          banner={selectedMovie.banner}
          cinemaName={selectedCinema ?? ""}
          roomName={selectedRoom ?? ""}
          date={selectedDate ?? ""}
          time={selectedTime ?? ""}
          seats={selectedSeats}
          pricePerTicket={18} // set real pricing if needed
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirming(false)}
        />
      )}
    </div>
  );
};

export default SeatBookingPage;
