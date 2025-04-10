import React from "react";
import { mockCinemas } from "../data/mockData"

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
    <div className="locations">
      <label>Location :</label>
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
  );
};

export default Locations;
