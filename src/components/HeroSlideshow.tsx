"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { MovieProps } from "../interfaces/movies"

interface Props {
    movies: MovieProps[]
}

const HeroSlideshow: React.FC<Props> = ({ movies }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (movies.length === 0) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === movies.length - 1 ? 0 : prev + 1))
        }, 5000)

        return () => clearInterval(interval)
    }, [movies])

    if (movies.length === 0) return <div className="empty-hero">No hero slides available</div>

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
                            {typeof movie.languages === "string" ? movie.languages : movie.languages?.join(", ")}
                        </p>
                        <button onClick={() => navigate(`/movie/${movie.movieId}`)}>
                            {movie.hasBookNow ? "Book Now" : "View Details"}
                        </button>
                    </div>
                </div>
            ))}
            <div className="hero-fade-bottom" />
            <div className="slide-indicators">
                {movies.map((_, index) => (
                    <span
                        key={index}
                        className={`slide-dot ${index === currentSlide ? "active" : ""}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </section>
    )
}

export default HeroSlideshow
