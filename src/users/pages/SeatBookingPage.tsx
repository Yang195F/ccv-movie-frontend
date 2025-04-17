import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import "../styles/seat_booking.css";
import { RoomTemplates } from "../../config/roomTemplate";
import SeatLegend from "../../components/SeatLegend";
import TicketConfirmationPopup from "../../components/TicketPopup";
import { getLayoutTypeFromRoomId } from "../../utils/layoutUtils";
import { getScreeningWithSeats } from "../../services/screeningService";

interface SeatStatus {
  row: string;
  number: string;
  status: string;
}

const SeatBookingPage: React.FC = () => {
  const { id } = useParams(); // screeningId
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCinema = searchParams.get("cinema");
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");
  const selectedRoom = searchParams.get("room");

  const [screening, setScreening] = useState<any>(null);
  const [seatStatuses, setSeatStatuses] = useState<{ [key: string]: string }>({});
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const fetchScreening = async () => {
      if (!id) return;
      const response = await getScreeningWithSeats(id);
      if (response.success && response.data?.seats) {
        setScreening(response.data);
        const statusMap: { [key: string]: string } = {};
        response.data.seats.forEach((seat: SeatStatus) => {
          const seatId = `${seat.row}${Number(seat.number)}`;
          statusMap[seatId] = seat.status;
        });
        setSeatStatuses(statusMap);
      } else {
        console.error("Failed to load screening or seat data.");
      }
    };

    fetchScreening();
  }, [id]);

  const seatGrid = useMemo(() => {
    const layout = getLayoutTypeFromRoomId(selectedRoom ?? "");
    const baseGrid = layout ? RoomTemplates[layout]?.generate() : [];

    return baseGrid.map(row =>
      row.map(seat => ({
        ...seat,
        status: seatStatuses[seat.id] ?? "available",
      }))
    );
  }, [selectedRoom, seatStatuses]);

  const handleSeatClick = (seat: string) => {
    if (seatStatuses[seat] === "sold") return;
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const getSeatStatus = (seatId: string) => {
    if (selectedSeats.includes(seatId)) return "selected";
    if (seatStatuses[seatId] === "sold") return "sold";
    return "available";
  };

  const handleConfirm = () => {
    if (!screening || !selectedCinema || !selectedRoom || !selectedDate || !selectedTime) return;

    navigate("/checkout", {
      state: {
        movie: {
          title: screening.movie,
          banner: screening.banner,
        },
        cinemaName: selectedCinema,
        roomName: selectedRoom,
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        pricePerTicket: 18,
      },
    });
  };

  if (!screening) {
    return <div className="loading">Loading screening...</div>;
  }

  return (
    <div className="seat-booking-wrapper">
      {/* 🎬 Banner Section */}
      <div
        className="banner-section"
        style={{ backgroundImage: `url(${screening?.banner ?? ""})` }}
      >
        <div className="banner-overlay">
          <div className="booking-header">
            <div className="header-inner">
              <button className="back-button" onClick={() => navigate(-1)}>←</button>
              <div className="header-center">
                <div className="progress-indicator">
                  <div className="progress-step active">1</div>
                  <div className="progress-line"></div>
                  <div className="progress-step inactive">2</div>
                </div>
              </div>
              <button className="close-button" onClick={() => navigate("/")}>×</button>
            </div>
          </div>

          <section className="movie-info">
            <h1 className="movie-title">{screening.movie}</h1>
            <p className="movie-meta">
              {screening.genre ?? "Genre"} | {screening.duration ?? "Duration"}
            </p>
            <div className="movie-details">
              <span className="detail-tag">{selectedCinema ?? "Cinema"}</span>
              <span className="detail-tag">{selectedRoom ?? "Room"}</span>
              <span className="detail-tag">{selectedDate}, {selectedTime}</span>
            </div>
          </section>
        </div>
      </div>

      {/* 🎟️ Booking Body */}
      <main className="booking-body">
        <SeatLegend />

        <div className="screen-container">
          <img
            src="/assets/icons/screen.jpg"
            alt="Cinema Screen"
            className="screen-img"
          />
        </div>

        <section className="seats-container">
          <div className="seat-grid-table">
            {seatGrid.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="seat-row">
                <div className="label-cell row-label">{row[0].row}</div>
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

      {isConfirming && (
        <TicketConfirmationPopup
          movieTitle={screening.movie}
          banner={screening.banner}
          cinemaName={selectedCinema ?? ""}
          roomName={selectedRoom ?? ""}
          date={selectedDate ?? ""}
          time={selectedTime ?? ""}
          seats={selectedSeats}
          pricePerTicket={18}
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirming(false)}
        />
      )}
    </div>
  );
};

export default SeatBookingPage;
