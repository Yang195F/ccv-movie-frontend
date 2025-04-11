// components/MovieCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { MovieProps } from "../interfaces/movies";

interface MovieCardProps {
  movie: MovieProps;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img src={movie.image} alt={movie.title} className="poster-image" />
      </div>
      <div className="movie-title">{movie.title}</div>
    </Link>
  );
};

export default MovieCard;
