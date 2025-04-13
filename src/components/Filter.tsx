import React from "react";
import "../users/styles/filter.css";

interface GenreDropdownProps {
  genres: string[];
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

const GenreDropdown: React.FC<GenreDropdownProps> = ({
  genres,
  selectedGenre,
  onGenreSelect,
}) => {
  return (
    <div className="genre-dropdown">
      <select
        value={selectedGenre}
        onChange={(e) => onGenreSelect(e.target.value)}
        className="genre-select"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreDropdown;
