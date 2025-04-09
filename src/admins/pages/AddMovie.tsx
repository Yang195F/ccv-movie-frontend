import React, { useState } from "react";
import "../styles/AddMovie.css";
import Navbar from "../../components/Navbar";
import { mockCinemas } from "../../data/mockData";

const durations = [
  { label: "30 minutes", value: "30min" },
  { label: "1 hour", value: "1h" },
  { label: "1 hour 30 minutes", value: "1h30min" },
  { label: "2 hours", value: "2h" },
  { label: "2 hours 30 minutes", value: "2h30min" },
  { label: "3 hours", value: "3h" },
];

const movieTypes = ["Action", "Comedy", "Drama"];

const AddMovie = () => {
  const [poster, setPoster] = useState<string | null>(null);
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [movieType, setMovieType] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [ticketPriceAdult, setTicketPriceAdult] = useState("0.00");
  const [ticketPriceChild, setTicketPriceChild] = useState("0.00");
  const [ticketPriceOKU, setTicketPriceOKU] = useState("0.00");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPoster(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  return (
    <div className="add-movie-page">
      <h1>
        <strong>Add Movie Details</strong>
      </h1>
      <div className="movie-details">
        {/* Movie Poster Preview */}
        <div className="movie-poster">
          <div
            className="poster-box"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            {poster ? (
              <img src={poster} alt="Movie Poster" className="poster-preview" />
            ) : (
              <p>No Image</p>
            )}
          </div>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Movie Form */}
        <div className="movie-form">
          <label>Movie Name:</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
          />

          <label>Release Date:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />

          <label>End Date:</label>
          <input type="date" />

          <label htmlFor="durations">Durations:</label>
          <select
            id="durations"
            name="durations"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            {durations.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>

          <label>Movie Type:</label>
          <select
            value={movieType}
            onChange={(e) => setMovieType(e.target.value)}
          >
            <option value="">Select a movie type</option>
            {movieTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label>Locations:</label>
          <div className="locations">
            {mockCinemas.map((cinema) => (
              <button
                key={cinema.name}
                className={selectedLocations.includes(cinema.name) ? "selected" : ""}
                onClick={() => toggleLocation(cinema.name)}
              >
                {cinema.name}
              </button>
            ))}
          </div>

          <label>Ticket Price:</label>
          <div className="ticket-prices">
            <div>
              <label>Adult:</label>
              <input
                type="text"
                value={ticketPriceAdult}
                onChange={(e) => setTicketPriceAdult(e.target.value)}
              />
            </div>
            <div>
              <label>Child:</label>
              <input
                type="text"
                value={ticketPriceChild}
                onChange={(e) => setTicketPriceChild(e.target.value)}
              />
            </div>
            <div>
              <label>OKU:</label>
              <input
                type="text"
                value={ticketPriceOKU}
                onChange={(e) => setTicketPriceOKU(e.target.value)}
              />
            </div>
          </div>

          <br />

          <div className="buttons">
            <button>Add Movie</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
