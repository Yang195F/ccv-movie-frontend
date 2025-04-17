import MovieCard from "./MovieCards";
import { MovieProps } from "../interfaces/movies";

interface Props {
    movies: MovieProps[];
}

const MovieGrid: React.FC<Props> = ({ movies }) => {
    return (
        <div className="movie-grid-wrapper">
            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.movieId} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieGrid;
