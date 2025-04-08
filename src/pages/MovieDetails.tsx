"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { mockMovies } from "../data/mockData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/moviedetails.css";

// Generate date range (today + 11 days)
const generateDateRange = (days: number): string[] => {
  const today = new Date();
  const range: string[] = [];
  for (let i = 0; i < days; i++) {
    const future = new Date(today);
    future.setDate(today.getDate() + i);
    range.push(future.toISOString().split("T")[0]);
  }
  return range;
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = mockMovies.find((m) => m.id === Number(id));
  const dateRange = useMemo(() => generateDateRange(12), []);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Set initial date
  useEffect(() => {
    if (!movie) return;
    const today = new Date().toISOString().split("T")[0];
    const allAvailableDates = movie.screenings.flatMap((s) =>
      s.sessions.map((sess) => sess.date)
    );
    const defaultDate = allAvailableDates.includes(today)
      ? today
      : allAvailableDates[0] || "";
    setSelectedDate(defaultDate);
  }, [movie]);

  // Filter sessions by selected date
  const filteredScreenings = useMemo(() => {
    if (!movie || !selectedDate) return [];
    return movie.screenings
      .map((screening) => ({
        cinema: screening.cinema,
        sessions: screening.sessions.filter((s) => s.date === selectedDate),
      }))
      .filter((s) => s.sessions.length > 0);
  }, [movie, selectedDate]);

  if (!movie) {
    return (
      <>
        <Navbar />
        <div className="not-found">Movie not found.</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="movie-details-container">
        {/* Hero Banner */}
        <div
          className="banner"
          style={{ backgroundImage: `url(${movie.banner})` }}
        >
          <button className="back-button" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} /> Back
          </button>
          <div className="details-overlay">
            <h1 className="title">{movie.title}</h1>
            <p className="metadata">
              {movie.genre} | {movie.duration} | {movie.languages.join(", ")}
            </p>
            <div className="button-group">
              <button className="info-btn">
                More Info <ChevronDown size={16} />
              </button>
              <button className="trailer-btn">Watch Trailer</button>
            </div>
          </div>
        </div>

        {/* Date Bar */}
        <div className="date-tab-bar">
          {dateRange.map((date) => {
            const isAvailable = movie.screenings.some((s) =>
              s.sessions.some((sess) => sess.date === date)
            );

            const label = new Date(date).toLocaleDateString("en", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });

            return (
              <div
                key={date}
                className={`date-tab ${selectedDate === date ? "active" : ""} ${
                  isAvailable ? "enabled" : "disabled"
                }`}
                onClick={() => isAvailable && setSelectedDate(date)}
              >
                {selectedDate === date && (
                  <span className="today-label">Today</span>
                )}
                <span className="date-text">{label.toUpperCase()}</span>
              </div>
            );
          })}
        </div>

        {/* Booking Section */}
        <div className="movie-booking-wrapper">
          <div className="booking-inner">
            <div className="cinema-section">
              {/* Legend */}
              <div className="legend">
                <span className="available">✓ Available</span>
                <span className="fast">🟡 Selling fast</span>
                <span className="sold">🔴 Sold out</span>
              </div>

              {/* Screenings */}
              {filteredScreenings.map((screen) => (
                <div key={screen.cinema} className="cinema-block">
                  <h4>{screen.cinema}</h4>
                  <div className="session-group">
                    {screen.sessions.map((sess, i) => (
                      <div key={i} className="session-tag">
                        <button className="time-btn">{sess.time}</button>
                        <p className="subdate">
                          {new Date(sess.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button className="cinema-details-toggle">
                <span>🎬 Cinema Details</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
