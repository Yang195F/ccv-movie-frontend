import React, { useState } from "react";
import "../styles/ManageShowTime.css";

const ManageShow = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedHall, setSelectedHall] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const movies = ["Movie 1", "Movie 2", "Movie 3"];
  const locations = ["Kuala Lumpur", "Selangor", "Penang"];
  const cinemas = ["Cinema A", "Cinema B", "Cinema C"];
  const halls = ["Hall 1", "Hall 2", "Hall 3"];
  const timeSlots = ["0000 - 0200", "0215 - 0415", "0430 - 0630", "0630 - ....", ".... - 2000", "2015 - 2215"];

  const toggleTimeSlot = (slot: string) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const selectAllTimeSlots = () => {
    setSelectedTimeSlots(timeSlots);
  };

  const removeAllTimeSlots = () => {
    setSelectedTimeSlots([]);
  };

  return (
    <div className="manage-show">
      <h1>Manage Showtime</h1>

      <div className="form-group">
        <label>Movie Name:</label>
        <select className="form-select" onChange={(e) => setSelectedMovie(e.target.value)}>
          <option value="">Select Movie</option>
          {movies.map((movie) => (
            <option key={movie} value={movie}>{movie}</option>
          ))}
        </select>
      </div>

      <div className="movie-poster">
        {selectedMovie ? `Poster for ${selectedMovie}` : "Display first movie poster, if select other movie will change to the selected movie poster"}
      </div>

      <div className="form-group">
        <label>Select a location:</label>
        <select className="form-select" onChange={(e) => setSelectedLocation(e.target.value)}>
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Select Cinema:</label>
        <select className="form-select" onChange={(e) => setSelectedCinema(e.target.value)}>
          <option value="">Select Cinema</option>
          {cinemas.map((cinema) => (
            <option key={cinema} value={cinema}>{cinema}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Select Hall:</label>
        <select className="form-select" onChange={(e) => setSelectedHall(e.target.value)}>
          <option value="">Select Hall</option>
          {halls.map((hall) => (
            <option key={hall} value={hall}>{hall}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Schedules Date:</label>
        <input
          type="date"
          className="date-input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="date-input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Time Slot:</label>
        <div className="time-slot-container">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className={`time-slot ${selectedTimeSlots.includes(slot) ? "selected" : ""}`}
              onClick={() => toggleTimeSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button className="select-all-btn" onClick={selectAllTimeSlots}>Select All Time</button>
        <button className="remove-all-btn" onClick={removeAllTimeSlots}>Remove All Time</button>
      </div>

      <button className="add-showtime-btn">Add Showtime</button>
    </div>
  );
};

export default ManageShow;
