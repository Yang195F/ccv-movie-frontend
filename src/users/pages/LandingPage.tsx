import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../styles/landing_page.css";

import { MovieProps } from "../../interfaces/movies";
import { CinemaProps } from "../../interfaces/cinemas";
import { mockCinemas, mockMovies } from "../../data/mockData";

const CinemaWebsite: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("NOW SHOWING");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [cinemas, setCinemas] = useState<CinemaProps[]>([]);
  const bannerMovies = movies.filter((movie) => movie.banner);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const tabs: string[] = ["NOW SHOWING", "BOOK EARLY", "COMING SOON", "ALL"];

  useEffect(() => {
    setMovies(mockMovies);
    setCinemas(mockCinemas);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (bannerMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === bannerMovies.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerMovies]);

  const navigateToCinema = (cinemaId: string, movieId?: number) => {
    const path = `/showtimes/${cinemaId}${movieId ? `?movie=${movieId}` : ""}`;
    navigate(path);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cinema-container">
      <Navbar />

      {/* Hero Slideshow */}
      <section className="hero-slideshow">
        {bannerMovies.length === 0 ? (
          <div>No Hero Slides Available</div>
        ) : (
          bannerMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{
                backgroundImage: `url(${movie.banner || "/placeholder.jpg"})`,
              }}
            >
              <div className="overlay">
                <h1 className="movie-title">{movie.title}</h1>
                <p className="movie-info">
                  {movie.genre} | {movie.duration} |{" "}
                  {movie.languages?.join(", ")}
                </p>
                <button
                  className="hero-button"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
        <div className="hero-fade-bottom" />
      </section>

      {/* Movie Tabs */}
      <div className="movie-tabs-section">
        <div className="tabs-wrapper">
          <div className="movie-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => {
                  if (tab === "ALL") navigate("/movies");
                  else setActiveTab(tab);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="movie-grid-wrapper">
          <div className="movie-grid">
            {movies.filter((movie) => movie.category === activeTab).length ===
            0 ? (
              <div>No Movies Available</div>
            ) : (
              movies
                .filter((movie) => movie.category === activeTab)
                .map((movie) => (
                  <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="movie-card"
                  >
                    <div className="movie-poster">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="poster-image"
                      />
                    </div>
                    <div className="movie-title">{movie.title}</div>
                  </Link>
                ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CinemaWebsite;
