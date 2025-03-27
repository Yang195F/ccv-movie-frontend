import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Heart, Info, Film, Filter, ChevronDown } from "lucide-react";
import "../styles/showtimes_styles.css";

interface DateOption {
  day: string;
  date: string;
  isToday?: boolean;
}

interface Cinema {
  id: string;
  name: string;
  isFavorite?: boolean;
}

interface Showtime {
  time: string;
  date?: string;
  status: "available" | "selling" | "soldout";
}

interface MovieFormat {
  name: string;
  logo: string;
  showtimes: Showtime[];
}

const MovieShowtimes: React.FC = () => {
  const { cinemaId } = useParams<{ cinemaId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("movie");

  const [selectedDate, setSelectedDate] = useState<string>("27 MAR");
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [expandedLocation, setExpandedLocation] = useState<boolean>(true);

  const dateOptions: DateOption[] = [
    { day: "TODAY", date: "27 MAR", isToday: true },
    { day: "FRI", date: "28 MAR" },
    { day: "SAT", date: "29 MAR" },
    { day: "SUN", date: "30 MAR" },
    { day: "MON", date: "31 MAR" },
    { day: "TUE", date: "1 APR" },
    { day: "WED", date: "2 APR" },
    { day: "THU", date: "3 APR" },
    { day: "FRI", date: "4 APR" },
    { day: "SAT", date: "5 APR" },
    { day: "SUN", date: "6 APR" },
    { day: "FRI", date: "11 APR" },
  ];

  const cinemas: Cinema[] = [
    { id: "1utama", name: "1 UTAMA", isFavorite: true },
    { id: "1shamelin", name: "1 SHAMELIN", isFavorite: true },
    { id: "ampangpoint", name: "AMPANG POINT", isFavorite: false },
    { id: "au2", name: "AU2 SETIAWANGSA", isFavorite: false },
    { id: "bukitraja", name: "BUKIT RAJA", isFavorite: false },
    { id: "bukittinggi", name: "BUKIT TINGGI", isFavorite: false },
    { id: "centralicity", name: "CENTRAL I-CITY", isFavorite: false },
    { id: "cherasselatan", name: "CHERAS SELATAN", isFavorite: false },
    { id: "cherassentral", name: "CHERAS SENTRAL", isFavorite: false },
    { id: "dpulze", name: "DPULZE CYBERJAYA", isFavorite: false },
    { id: "pavilion", name: "PAVILION BUKIT JALIL", isFavorite: false },
  ];

  const movieFormats: MovieFormat[] = [
    {
      name: "IMAX",
      logo: "imax-logo",
      showtimes: [
        { time: "1:00 PM", status: "available" },
        { time: "3:45 PM", status: "available" },
        { time: "6:30 PM", status: "available" },
        { time: "9:30 PM", status: "available" },
        { time: "12:30 AM", date: "28 Mar 2025", status: "available" },
      ],
    },
    {
      name: "INDULGE",
      logo: "indulge-logo",
      showtimes: [
        { time: "1:30 PM", status: "available" },
        { time: "2:15 PM", status: "selling" },
        { time: "4:45 PM", status: "available" },
        { time: "5:30 PM", status: "available" },
        { time: "8:00 PM", status: "available" },
      ],
    },
    {
      name: "BEANIE",
      logo: "beanie-logo",
      showtimes: [
        { time: "11:15 PM", status: "available" },
        { time: "11:30 PM", status: "selling" },
      ],
    },
  ];

  // Set the selected cinema based on the URL parameter
  useEffect(() => {
    if (cinemaId) {
      const cinema = cinemas.find((c) => c.id === cinemaId);
      if (cinema) {
        setSelectedCinema(cinema.name);
      }
    }
  }, [cinemaId, cinemas]);

  const toggleLocationExpand = () => {
    setExpandedLocation(!expandedLocation);
  };

  const toggleFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real app, this would update state or call an API
    console.log(`Toggled favorite for ${id}`);
  };

  const handleCinemaSelect = (cinema: Cinema) => {
    setSelectedCinema(cinema.name);

    // Navigate to the new cinema page with the current movie if available
    const queryParams = movieId ? `?movie=${movieId}` : "";
    navigate(`/showtimes/${cinema.id}${queryParams}`);
  };

  return (
    <div className="showtimes-container">
      {/* Header */}
      <header className="showtimes-header">
        <a href="/" className="logo">
          YourCinema
        </a>
        <nav className="main-nav">
          <a href="/movies" className="nav-link">
            MOVIES
          </a>
          <a href="/cinemas" className="nav-link">
            CINEMAS
          </a>
          <a href="/food-drinks" className="nav-link">
            FOOD & DRINKS
          </a>
          <a href="/promotions" className="nav-link">
            PROMOTIONS
          </a>
        </nav>
      </header>

      {/* Date Selector */}
      <div className="date-selector">
        {dateOptions.map((option) => (
          <div
            key={option.date}
            className={`date-option ${
              selectedDate === option.date ? "selected" : ""
            }`}
            onClick={() => setSelectedDate(option.date)}
          >
            <div className="day-name">{option.day}</div>
            <div className="date-value">{option.date}</div>
          </div>
        ))}
      </div>

      <div className="content-container">
        {/* Cinema Locations Sidebar */}
        <div className="locations-sidebar">
          <div className="location-header" onClick={toggleLocationExpand}>
            <h2>KLANG VALLEY</h2>
            <ChevronDown
              className={`chevron ${expandedLocation ? "expanded" : ""}`}
            />
          </div>

          {expandedLocation && (
            <div className="cinema-list">
              {cinemas.map((cinema) => (
                <div
                  key={cinema.id}
                  className={`cinema-item ${
                    selectedCinema === cinema.name ? "selected" : ""
                  }`}
                  onClick={() => handleCinemaSelect(cinema)}
                >
                  <Heart
                    className={`heart-icon ${
                      cinema.isFavorite ? "favorite" : ""
                    }`}
                    onClick={(e) => toggleFavorite(cinema.id, e)}
                  />
                  <span className="cinema-name">{cinema.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Movie Showtimes */}
        <div className="showtimes-content">
          <div className="cinema-header">
            <h1>KLANG VALLEY - {selectedCinema}</h1>
            <div className="info-icon">
              <Info size={20} />
            </div>
          </div>

          <div className="status-legend">
            <div className="status-item">
              <div className="status-indicator available"></div>
              <span>Available</span>
            </div>
            <div className="status-item">
              <div className="status-indicator selling"></div>
              <span>Selling fast</span>
            </div>
            <div className="status-item">
              <div className="status-indicator soldout"></div>
              <span>Sold out</span>
            </div>

            <button className="filter-button">
              <Filter size={16} />
              FILTER BY
            </button>
          </div>

          <div className="movie-details">
            <div className="movie-poster">
              <img
                src="https://via.placeholder.com/300x450"
                alt="NE ZHA 2 Movie Poster"
              />
            </div>

            <div className="movie-info">
              <h2 className="movie-title">NE ZHA 2 哪吒之魔童闯海</h2>
              <div className="movie-metadata">
                Animation, Action, Drama | 2 hr 24 mins | Mandarin
              </div>

              <div className="action-buttons">
                <button className="info-button">
                  <Info size={16} />
                  MORE INFO
                </button>
                <button className="trailer-button">
                  <Film size={16} />
                  WATCH TRAILER
                </button>
              </div>

              {/* Movie Formats and Showtimes */}
              {movieFormats.map((format, index) => (
                <div key={index} className="movie-format">
                  <div className={`format-logo ${format.logo}`}>
                    {format.name}
                  </div>

                  <div className="showtimes-grid">
                    {format.showtimes.map((showtime, idx) => (
                      <div
                        key={idx}
                        className={`showtime-slot ${showtime.status}`}
                      >
                        <div className="time">{showtime.time}</div>
                        {showtime.date && (
                          <div className="date">{showtime.date}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieShowtimes;
