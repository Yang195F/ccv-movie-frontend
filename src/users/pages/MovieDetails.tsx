"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { getMovieById } from "../../services/movieService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../styles/moviedetails.css";

const isPastSession = (dateStr: string, timeStr: string): boolean => {
  const now = new Date();
  const sessionDateTime = new Date(`${dateStr}T${timeStr}`);
  return sessionDateTime < now;
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await getMovieById(id!);
        if (result.success) {
          setMovie(result.data);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const availableDates = useMemo(() => {
    if (!movie?.screenings) return [];

    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 6);

    const allDates = movie.screenings.map((s: any) =>
      new Date(s.startTime).toISOString().split("T")[0]
    );

    const uniqueDates = Array.from(new Set(allDates)) as string[];

    return uniqueDates
      .filter((d: string) => {
        const date = new Date(d);
        return date >= today && date <= sevenDaysLater;
      })
      .sort((a: string, b: string) => new Date(a).getTime() - new Date(b).getTime());
  }, [movie]);

  useEffect(() => {
    if (availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);

  const filteredScreenings = useMemo(() => {
    if (!movie?.screenings || !selectedDate) return [];

    const sessions = movie.screenings
      .filter((s: any) => {
        const sessionDate = new Date(s.startTime).toISOString().split("T")[0];
        return sessionDate === selectedDate;
      })
      .map((s: any) => ({
        screeningId: s.screeningId, // 👈 make sure this is coming from backend
        cinema: s.cinemaName || "Unknown Cinema",
        date: new Date(s.startTime).toISOString().split("T")[0],
        time: new Date(s.startTime).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        roomId: s.roomId || "Unknown Room ID",
        status: "available",
      }));

    const grouped = sessions.reduce((acc: any, curr: any) => {
      const found = acc.find((g: any) => g.cinema === curr.cinema);
      if (found) {
        found.sessions.push(curr);
      } else {
        acc.push({ cinema: curr.cinema, sessions: [curr] });
      }
      return acc;
    }, []);

    return grouped;
  }, [movie, selectedDate]);

  const hasValidShowtimes = filteredScreenings.some((screen: any) =>
    screen.sessions.some(
      (s: any) => !isPastSession(s.date, s.time) && s.status !== "sold out"
    )
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading movie...</div>
        <Footer />
      </>
    );
  }

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
        <div className="banner" style={{ backgroundImage: `url(${movie.banner})` }}>
          <button className="back-button" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} /> Back
          </button>
          <div className="details-overlay">
            <h1 className="title">{movie.title}</h1>
            <p className="metadata">
              {movie.genre} | {movie.duration} |{" "}
              {Array.isArray(movie.languages)
                ? movie.languages.join(", ")
                : movie.languages}
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
                filteredScreenings.map((screen: any) => (
                  <div key={screen.cinema} className="cinema-block">
                    <h4>{screen.cinema}</h4>
                    <div className="session-group">
                      {screen.sessions.map((sess: any, i: number) => {
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
                                  `/booking/${sess.screeningId}?cinema=${encodeURIComponent(
                                    screen.cinema
                                  )}&date=${sess.date}&time=${sess.time}&room=${sess.roomId}`
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
                  No showtimes available for the next 7 days.
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
