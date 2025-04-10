import React from "react";
import { mockCinemas } from "../data/mockData";

interface CinemaLocationsProps {
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
}

const Locations: React.FC<CinemaLocationsProps> = ({ selectedLocations, setSelectedLocations }) => {
  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location]
    );
  };

  return (
    <div className="cinema-locations">
      <label>Location :</label>
      <div className="locations">
        {mockCinemas.map((cinema) => (
          <button
            key={cinema.name}
            className={`location-option ${selectedLocations.includes(cinema.name) ? "selected" : ""}`}
            onClick={() => toggleLocation(cinema.name)}
          >
            {cinema.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Locations;
