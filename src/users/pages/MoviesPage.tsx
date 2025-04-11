import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../styles/landing_page.css";
import MovieCard from "../../components/MovieCards";
import "../styles/movie_page.css";

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

  const navigateToCinema = (cinemaId: string, movieId?: number) => {
    const path = `/showtimes/${cinemaId}${movieId ? `?movie=${movieId}` : ""}`;
    navigate(path);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cinema-container">
      <Navbar />
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
                  setActiveTab(tab);
                }}
              >
                {tab}
              </button>
            ))}

            {/* 👉 New Filter Button */}
            <button className="filter-button">
              <span className="filter-icon">⚙️</span> FILTER
            </button>
          </div>
        </div>

        <div className="movie-grid-wrapper">
          <div className="movie-grid">
            {movies
              .filter((movie) =>
                activeTab === "ALL" ? true : movie.category === activeTab
              )
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CinemaWebsite;
