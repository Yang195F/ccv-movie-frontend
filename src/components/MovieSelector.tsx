import React from 'react';
import { MovieProps } from '../data/mockData';

interface MovieSelectorProps {
  movies: MovieProps[];
  selectedMovie: MovieProps | null;
  setSelectedMovie: (movie: MovieProps) => void;
}

const MovieSelector: React.FC<MovieSelectorProps> = ({ movies, selectedMovie, setSelectedMovie }) => {
  return (
    <div className="movie-selector">
      <div className="movie-list">
        <label>Select Movie:</label>
        <select 
          value={selectedMovie?.id || ''} 
          onChange={(e) => {
            const movie = movies.find(m => m.id === Number(e.target.value));
            if (movie) setSelectedMovie(movie);
          }}
        >
          <option value="">Select a movie</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
      </div>

      {selectedMovie && (
        <div className="movie-preview">
          <img 
            src={selectedMovie.image} 
            alt={selectedMovie.title}
            className="movie-image"
          />
          <div className="movie-info">
            <p><strong>Duration:</strong> {selectedMovie.duration}</p>
            <p><strong>Release Date:</strong> {selectedMovie.releaseDate}</p>
            <p><strong>Genre:</strong> {selectedMovie.genre}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSelector;