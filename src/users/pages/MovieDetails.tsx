"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { mockMovies } from "../../data/mockData";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../styles/moviedetails.css";

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

const isPastSession = (dateStr: string, timeStr: string): boolean => {
  const now = new Date();
  const sessionDateTime = new Date(`${dateStr}T${timeStr}`);
  return sessionDateTime < now;
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = mockMovies.find((m) => m.id === Number(id));
  const todayISO = new Date().toISOString().split("T")[0];

  // Only show today and future dates based on screening data
  const availableDates = useMemo(() => {
    if (!movie?.screenings) return [];
    const allDates = movie.screenings.flatMap(
      (s) => s.sessions?.map((sess) => sess.date) || []
    );
    const uniqueDates = Array.from(new Set(allDates));
    return uniqueDates
      .filter((d) => new Date(d) >= new Date(todayISO))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }, [movie]);

  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);

  const filteredScreenings = useMemo(() => {
    if (!movie?.screenings || !selectedDate) return [];
    return movie.screenings
      .map((screening) => ({
        cinema: screening.cinema,
        sessions: (screening.sessions || []).filter(
          (s) => s.date === selectedDate
        ),
      }))
      .filter((s) => s.sessions.length > 0);
  }, [movie, selectedDate]);

  const hasValidShowtimes = filteredScreenings.some((screen) =>
    screen.sessions.some(
      (s) => !isPastSession(s.date, s.time) && s.status !== "sold out"
    )
  );

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

        {/* Date Tabs */}
        <div className="date-tab-bar">
          {availableDates.map((date) => {
            const label = new Date(date).toLocaleDateString("en", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });
            return (
              <div
                key={date}
                className={`date-tab ${selectedDate === date ? "active" : ""}`}
                onClick={() => setSelectedDate(date)}
              >
                <span className="date-text">{label.toUpperCase()}</span>
              </div>
            );
          })}
        </div>

        {/* Booking Section */}
        <div className="movie-booking-wrapper">
          <div className="booking-inner">
            <div className="cinema-section">
              <div className="legend">
                <span className="available">✓ Available</span>
                <span className="fast">🟡 Selling fast</span>
                <span className="sold">🔴 Sold out</span>
              </div>

              {hasValidShowtimes ? (
                filteredScreenings.map((screen) => (
                  <div key={screen.cinema} className="cinema-block">
                    <h4>{screen.cinema}</h4>
                    <div className="session-group">
                      {screen.sessions.map((sess, i) => {
                        const isPast = isPastSession(sess.date, sess.time);
                        const isSold = sess.status === "sold out";
                        const canBook = !isPast && !isSold;

                        const statusClass = isPast
                          ? "past"
                          : isSold
                          ? "sold"
                          : sess.status === "selling fast"
                          ? "fast"
                          : "available";

                        return (
                          <div key={i} className="session-tag">
                            <button
                              className={`time-btn ${statusClass}`}
                              disabled={!canBook}
                              onClick={() =>
                                canBook &&
                                navigate(
                                  `/booking/${
                                    movie?.id
                                  }?cinema=${encodeURIComponent(
                                    screen.cinema
                                  )}&date=${sess.date}&time=${sess.time}&room=${
                                    sess.roomId
                                  }`
                                )
                              }
                            >
                              {sess.time}
                            </button>
                            <p className="subdate">
                              {new Date(sess.date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-showtimes-message">
                  No showtimes available for today.
                </p>
              )}

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
