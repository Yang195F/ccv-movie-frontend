import React, { useState } from "react";
import "../styles/AddMovie.css";

const AddMovie = () => {
  const [poster, setPoster] = useState<string | null>(null);
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [movieType, setMovieType] = useState("");
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
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

  const schedules = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const locations = ["Kuala Lumpur", "Penang", "Johor", "Selangor", "Sabah", "Sarawak"];

  const toggleSchedule = (day: string) => {
    setSelectedSchedules((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location]
    );
  };

  return (
    <div className="add-movie-page">
      <h2>Add Movie</h2>
      <div className="movie-details">
        {/* Movie Poster Preview Box */}
        <div className="movie-poster">
          <div className="poster-box">
            {poster ? <img src={poster} alt="Movie Poster" /> : "No Image"}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Movie Form */}
        <div className="movie-form">
          <label>Movie Name:</label>
          <input type="text" value={movieName} onChange={(e) => setMovieName(e.target.value)} />

          <label>Release Date:</label>
          <input type="date" id="release-date" name="release-date" />

          <label htmlFor="durations">Durations:</label>
          <select id="durations" name="durations">
              <option value="30min">30 minutes</option>
              <option value="1h">1 hour</option>
              <option value="1h30min">1 hour 30 minutes</option>
              <option value="2h">2 hours</option>
              <option value="2h30min">2 hours 30 minutes</option>
              <option value="3h">3 hours</option>
          </select>

          <label>Movie Type:</label>
          <select value={movieType} onChange={(e) => setMovieType(e.target.value)}>
            <option value="">Select a movie type</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
          </select>

          <label>Schedules:</label>
          <div className="schedules">
            {schedules.map((day) => (
              <button key={day} className={selectedSchedules.includes(day) ? "selected" : ""} onClick={() => toggleSchedule(day)}>
                {day}
              </button>
            ))}
          </div>

          <label>Locations:</label>
          <div className="locations">
            {locations.map((loc) => (
              <button key={loc} className={selectedLocations.includes(loc) ? "selected" : ""} onClick={() => toggleLocation(loc)}>
                {loc}
              </button>
            ))}
          </div>

          <label>Ticket Price:</label>
          <div className="ticket-prices">
            <div>
              <label>Adult:</label>
              <input type="text" value={ticketPriceAdult} onChange={(e) => setTicketPriceAdult(e.target.value)} />
            </div>
            <div>
              <label>Child:</label>
              <input type="text" value={ticketPriceChild} onChange={(e) => setTicketPriceChild(e.target.value)} />
            </div>
            <div>
              <label>OKU:</label>
              <input type="text" value={ticketPriceOKU} onChange={(e) => setTicketPriceOKU(e.target.value)} />
            </div>
          </div>

          <div className="buttons">
            <button>Add Movie</button>
            <button>Edit Movie</button>
            <button>Delete Movie</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
