import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../styles/landing_page.css";
import MovieCard from "../../components/MovieCards";
import "../styles/movie_page.css";
import "../styles/global.css";
import FilterButton from "../../components/Filter";

import { MovieProps } from "../../interfaces/movies";
import { CinemaProps } from "../../interfaces/cinemas";
import { mockCinemas, mockMovies } from "../../data/mockData";

const MoviesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("NOW SHOWING");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [cinemas, setCinemas] = useState<CinemaProps[]>([]);
  const bannerMovies = movies.filter((movie) => movie.banner);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const allGenres = Array.from(
    new Set(mockMovies.flatMap((m) => m.genre?.split(", ") || []))
  );

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

            {/* Filter Button + Dropdown */}

            <FilterButton
              genres={allGenres}
              selectedGenre={selectedGenre}
              onGenreSelect={setSelectedGenre}
            />
          </div>
        </div>

        <div className="movie-grid-wrapper">
          <div className="movie-grid">
            {movies.filter((movie) => {
              const matchesTab =
                activeTab === "ALL" ? true : movie.category === activeTab;
              const matchesGenre =
                !selectedGenre ||
                movie.genre
                  ?.toLowerCase()
                  .includes(selectedGenre.toLowerCase());
              return matchesTab && matchesGenre;
            }).length === 0 ? (
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "2rem",
                }}
              >
                No movies found for this genre.
              </p>
            ) : (
              movies
                .filter((movie) => {
                  const matchesTab =
                    activeTab === "ALL" ? true : movie.category === activeTab;
                  const matchesGenre =
                    !selectedGenre ||
                    movie.genre
                      ?.toLowerCase()
                      .includes(selectedGenre.toLowerCase());
                  return matchesTab && matchesGenre;
                })
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
