import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MovieCard from "../../components/MovieCards";
import "../styles/landing_page.css";
import "../styles/movie_page.css";

import { MovieProps } from "../../interfaces/movies";
import { CinemaProps } from "../../interfaces/cinemas";
import { getAllMovies } from "../../services/movieService";
import { getCinemas } from "../../services/cinemaService";

const CinemaWebsite: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("NOW SHOWING");
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [cinemas, setCinemas] = useState<CinemaProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const tabs: string[] = ["NOW SHOWING", "BOOK EARLY", "COMING SOON", "ALL"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const movieResult = await getAllMovies();
        const cinemaResult = await getCinemas();

        if (movieResult.success) {
          setMovies(movieResult.data);
        } else {
          setError("Failed to load movies");
        }

        if (cinemaResult.success) {
          setCinemas(cinemaResult.data);
        } else {
          setError("Failed to load cinemas");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToCinema = (cinemaId: string, movieId?: number) => {
    const path = `/showtimes/${cinemaId}${movieId ? `?movie=${movieId}` : ""}`;
    navigate(path);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredMovies = movies.filter((movie) =>
    activeTab === "ALL" ? true : movie.category === activeTab
  );

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

            {/* Filter Button */}
            <button className="filter-button">
              <span className="filter-icon">⚙️</span> FILTER
            </button>
          </div>
        </div>

        {/* Movie Grid */}
        <div className="movie-grid-wrapper">
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.movieId} movie={movie} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CinemaWebsite;
