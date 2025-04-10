// src/components/PosterSlider.tsx
import React from "react";
import { Link } from "react-router-dom";
import { mockMovies } from "../data/mockData";
import "../admins/styles/posterSlider.css";
interface PosterSliderProps {
  filter: string;
}

const PosterSlider: React.FC<PosterSliderProps> = ({ filter }) => {
  const getFilteredMovies = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    switch (filter) {
      case "today":
        return mockMovies.filter((movie) => movie.releaseDate === currentDate);
      case "upcoming":
        return mockMovies.filter((movie) => movie.releaseDate > currentDate);
      case "outdated":
        return mockMovies.filter((movie) => movie.releaseDate < currentDate);
      default:
        return mockMovies;
    }
  };

  const filteredMovies = getFilteredMovies();

  return (
    <div className="poster-slider">
      {filteredMovies.map((movie) => (
        <Link
          to={`/updatemovie/${movie.id}`}
          key={movie.id}
          className="poster-item"
        >
          <div className="poster-image">
            <img src={movie.image || "/placeholder.svg"} alt={movie.title} />
          </div>
        </Link>
      ))}

      {filteredMovies.length === 0 && (
        <>
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="poster-item">
              <div className="poster-placeholder">Image{num}.png</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PosterSlider;