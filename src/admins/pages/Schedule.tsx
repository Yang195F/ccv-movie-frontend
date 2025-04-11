import React, { useState } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import MovieSelector from '../../components/MovieSelector';
import CinemaLocations from '../../components/Location';
import CinemaRoom from '../../components/CinemaRoom';
import TimeSlot from '../../components/TimeSlot';
import { mockMovies, MovieProps } from '../../data/mockData';
import '../styles/Schedule.css';

const Schedule = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  return (
    <div className="schedule-page">
      <NavbarAdmin />
      <div className="schedule-container">
        <h1>Schedule Movie</h1>
        
        <div className="schedule-form">
          {/* Movie Selection */}
          <MovieSelector
            movies={mockMovies}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />

          {selectedMovie && (
            <>
              {/* Date Selection */}
              <div className="form-group">
                <label>Select Date:</label>
                <input
                  type="date"
                  min={selectedMovie.releaseDate}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              {/* Location Selection */}
              <CinemaLocations
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
              />

              {/* Room Selection */}
              <CinemaRoom
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />

              {/* Time Slot Selection */}
              <TimeSlot
                selectedTimeSlot={selectedTimeSlot}
                setSelectedTimeSlot={setSelectedTimeSlot}
              />

              <div className="buttons">
                <button className="schedule-button">Schedule Movie</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;