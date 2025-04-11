import React from 'react';
import { MovieProps } from '../data/mockData';

interface MovieSelectorProps {
  movies: MovieProps[];
  selectedMovie: MovieProps | null;
  setSelectedMovie: (movie: MovieProps) => void;
}

const MovieSelector: React.FC<MovieSelectorProps> = ({ movies, selectedMovie, setSelectedMovie }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const movie = movies.find(m => m.id === Number(e.target.value));
    if (movie) {
      setSelectedMovie(movie);

      // You can access data here
      console.log('Duration:', movie.duration);
      console.log('Release Date:', movie.releaseDate);
      console.log('End Date:', movie.endDate);

      
    }
  };

  return (
    <div className="movie-selector">
      <label>Select Movie:</label>
      <select value={selectedMovie?.id || ''} onChange={handleChange}>
        <option value="">Select a movie</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
      </select>

      {selectedMovie && (
        <div className="movie-preview">
          <img 
            src={selectedMovie.image} 
            alt={selectedMovie.title}
            className="movie-image"
          />
        </div>
      )}
    </div>
  );
};

export default MovieSelector;
