import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieProps } from "../interfaces/movies";

interface Props {
    movies: MovieProps[];
}

const HeroSlideshow: React.FC<Props> = ({ movies }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (movies.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [movies]);

    if (movies.length === 0) return <div>No hero slides available</div>;

    return (
        <section className="hero-slideshow">
            {movies.map((movie, index) => (
                <div
                    key={movie.movieId}
                    className={`hero-slide ${index === currentSlide ? "active" : ""}`}
                    style={{ backgroundImage: `url(${movie.banner})` }}
                >
                    <div className="overlay">
                        <h1>{movie.title}</h1>
                        <p>
                            {movie.genre} | {movie.duration} |{" "}
                            {typeof movie.languages === "string"
                                ? movie.languages
                                : movie.languages?.join(", ")}
                        </p>
                        <button onClick={() => navigate(`/movie/${movie.movieId}`)}>Book Now</button>
                    </div>
                </div>
            ))}
            <div className="hero-fade-bottom" />
        </section>
    );
};

export default HeroSlideshow;
