import React, { useMemo, useState } from "react";
import "../styles/cinemas_page.css";
import { Heart, ChevronDown, User, Filter, Info, Play } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DateTabBar from "../../components/DateTab";
import { mockCinemas, mockMovies } from "../../data/mockData";
import FilterButton from "../../components/Filter";
import { useNavigate } from "react-router-dom";

export default function CinemaPage() {
  const uniqueCinemas = Array.from(
    new Set(
      mockMovies.flatMap(
        (movie) => movie.screenings?.map((s) => s.cinema) || []
      )
    )
  );

  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string>(""); // ✅ empty string, not null

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCinema, setSelectedCinema] = useState<string>("Pavilion KL"); // default

  const filteredMovies = useMemo(() => {
    return mockMovies.filter((movie) => {
      const matchesCinemaAndDate = movie.screenings?.some(
        (screening) =>
          screening.cinema === selectedCinema &&
          screening.sessions?.some((session) => session.date === selectedDate)
      );

      const matchesGenre =
        !selectedGenre || // Show all if no genre selected
        movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase());

      return matchesCinemaAndDate && matchesGenre;
    });
  }, [selectedDate, selectedCinema, selectedGenre]);

  // get all genres from movies:
  const allGenres = Array.from(
    new Set(
      mockMovies
        .flatMap((movie) => movie.genre?.split(",") || [])
        .map((g) => g.trim())
    )
  );

  const [selectedExperience, setSelectedExperience] = useState("all");

  return (
    <div className="movie-theater">
      {
        <DateTabBar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      }

      <div className="content">
        <div className="sidebar">
          <div className="location-list">
            {mockCinemas.map((cinema) => (
              <li
                key={cinema.name}
                className={`location-item ${
                  selectedCinema === cinema.name ? "selected" : ""
                }`}
                onClick={() => setSelectedCinema(cinema.name)}
              >
                <Heart
                  size={16}
                  className={`heart-icon ${
                    selectedCinema === cinema.name
                      ? "location-heart-selected"
                      : ""
                  }`}
                />
                <span>{cinema.name}</span>
              </li>
            ))}
          </div>
        </div>

        <div className="main-content">
          <div className="location-header">
            <h2>{selectedLocation}</h2>
            <div className="status-indicators">
              <span className="status available">Available</span>
              <span className="status selling-fast">Selling fast</span>
              <span className="status sold-out">Sold out</span>
            </div>
            <FilterButton
              genres={allGenres}
              selectedGenre={selectedGenre}
              onGenreSelect={setSelectedGenre}
            />
          </div>

          <div className="movies-list">
            {filteredMovies.length === 0 ? (
              <div className="no-movies-message">
                🎬 No movies available for {selectedCinema} on {selectedDate}.
              </div>
            ) : (
              filteredMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <div className="movie-poster">
                    <img
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                    />
                  </div>
                  <div className="movie-details">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-info">
                      {movie.genre} | {movie.duration} |{" "}
                      {movie.languages?.join(", ")}
                    </p>

                    {movie.screenings
                      ?.find((s) => s.cinema === selectedCinema)
                      ?.sessions?.filter((sess) => sess.date === selectedDate)
                      .map((sess, index) => {
                        const isSold = sess.status === "sold out";
                        const isFast = sess.status === "selling fast";
                        const statusClass = isSold
                          ? "sold"
                          : isFast
                          ? "fast"
                          : "available";

                        return (
                          <div key={index} className="showtime-group">
                            <div className="showtime-type">
                              {sess.roomId?.toUpperCase()}{" "}
                              <span className="info-circle">i</span>
                            </div>
                            <div className="showtime-buttons">
                              <button
                                className={`time-btn ${statusClass}`}
                                disabled={isSold}
                                onClick={() => {
                                  if (!isSold) {
                                    navigate(
                                      `/booking/${
                                        movie.id
                                      }?cinema=${encodeURIComponent(
                                        selectedCinema
                                      )}&date=${selectedDate}&time=${
                                        sess.time
                                      }&room=${sess.roomId}`
                                    );
                                  }
                                }}
                              >
                                {sess.time}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
