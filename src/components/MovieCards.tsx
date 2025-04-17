// components/MovieCard.tsx
import type React from "react"
import { Link } from "react-router-dom"
import type { MovieProps } from "../interfaces/movies"

interface MovieCardProps {
  movie: MovieProps
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.movieId}`} className="movie-card">
      <div className="movie-poster">
        <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="poster-image" />
        {movie.category === "NOW SHOWING" && <span className="movie-badge now-showing">Now Showing</span>}
        {movie.category === "COMING SOON" && <span className="movie-badge coming-soon">Coming Soon</span>}
        {movie.category === "BOOK EARLY" && <span className="movie-badge book-early">Book Early</span>}
        {movie.hasBookNow && (
          <div className="movie-hover-overlay">
            <button className="movie-book-btn">Book Now</button>
          </div>
        )}
      </div>
      <div className="movie-title">{movie.title}</div>
      <div className="movie-info">
        <span className="movie-genre">{movie.genre}</span>
        <span className="movie-duration">{movie.duration}</span>
      </div>
    </Link>
  )
}

export default MovieCard
