"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import "../styles/movie_page.css";

interface MovieProps {
  id: number;
  title: string;
  image: string;
  subtitle?: string;
  rating: string;
  releaseDate?: string;
}

const MoviesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("NOW SHOWING");
  const [activeExperience, setActiveExperience] = useState<string>("ALL");
  const [showCinemaDropdown, setShowCinemaDropdown] = useState<boolean>(false);

  const categories = ["NOW SHOWING", "BOOK EARLY", "COMING SOON"];

  const movies: MovieProps[] = [
    {
      id: 1,
      title: "NE ZHA 2 魔童之魔童闯海",
      image: "https://via.placeholder.com/400x600/000000/FFFFFF?text=NE+ZHA+2",
      rating: "P12",
      releaseDate: "13.03.25",
    },
    {
      id: 2,
      title: "PETAKA GUNUNG GEDE",
      image:
        "https://via.placeholder.com/400x600/000000/FFFFFF?text=PETAKA+GUNUNG+GEDE",
      rating: "18",
    },
    {
      id: 3,
      title: 'ADO SPECIAL LIVE "SHINZOU" IN CINEMA',
      image:
        "https://via.placeholder.com/400x600/000000/FFFFFF?text=ADO+SPECIAL",
      rating: "P12",
    },
    {
      id: 4,
      title: "A MINECRAFT MOVIE",
      image: "https://via.placeholder.com/400x600/000000/FFFFFF?text=MINECRAFT",
      rating: "P12",
    },
  ];

  // Available cinemas for navigation
  const cinemas = [
    { id: "1utama", name: "1 UTAMA" },
    { id: "1shamelin", name: "1 SHAMELIN" },
    { id: "ampangpoint", name: "AMPANG POINT" },
    { id: "au2", name: "AU2 SETIAWANGSA" },
    { id: "bukitraja", name: "BUKIT RAJA" },
    { id: "bukittinggi", name: "BUKIT TINGGI" },
    { id: "centralicity", name: "CENTRAL I-CITY" },
    { id: "cherasselatan", name: "CHERAS SELATAN" },
    { id: "cherassentral", name: "CHERAS SENTRAL" },
    { id: "dpulze", name: "DPULZE CYBERJAYA" },
    { id: "pavilion", name: "PAVILION BUKIT JALIL" },
  ];

  const navigateToCinema = (cinemaId: string, movieId?: number) => {
    const path = `/showtimes/${cinemaId}${movieId ? `?movie=${movieId}` : ""}`;
    navigate(path);
  };

  return (
    <div className="cinema-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <a href="/" className="logo">
            <img
              src="https://via.placeholder.com/120x40/000000/FF0000?text=TGV"
              alt="TGV Cinemas"
              className="logo-image"
            />
          </a>
          <div className="dropdown">
            <button
              className="location-button"
              onClick={() => setShowCinemaDropdown(!showCinemaDropdown)}
            >
              <span className="location-icon">📍</span>
              ALL STATES/AREAS
            </button>
            {showCinemaDropdown && (
              <div className="dropdown-content">
                <h3>Select a Cinema</h3>
                <div className="cinema-dropdown-list">
                  {cinemas.map((cinema) => (
                    <div
                      key={cinema.id}
                      className="cinema-dropdown-item"
                      onClick={() => navigateToCinema(cinema.id)}
                    >
                      {cinema.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="main-nav">
          <a href="/movies" className="nav-link active">
            MOVIES
          </a>
          <a href="/cinemas" className="nav-link">
            CINEMAS
          </a>
          <a href="/food-drinks" className="nav-link">
            FOOD & DRINKS
          </a>
          <a href="/promotions" className="nav-link">
            PROMOTIONS
          </a>
          <div className="dropdown">
            <button className="nav-link dropdown-toggle">
              MORE
              <ChevronDown size={16} className="dropdown-arrow" />
            </button>
          </div>
        </nav>

        <a href="/sign-in" className="sign-in-button">
          <span className="user-icon">👤</span>
          SIGN IN
        </a>
      </header>

      {/* Movie Categories */}
      <div className="movie-categories">
        <div className="categories-container">
          <div className="categories-list">
            {categories.map((category) => (
              <div
                key={category}
                className={`category-item ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
          <button className="filter-button">
            <span className="filter-icon">⚙️</span>
            FILTER BY
          </button>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="movie-grid-container">
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                <img
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  className="poster-image"
                />
                <div
                  className={`movie-rating ${
                    movie.rating === "18" ? "rating-18" : "rating-p12"
                  }`}
                >
                  {movie.rating}
                </div>
              </div>
              <div
                className="movie-title"
                onClick={() => navigateToCinema("1utama", movie.id)}
              >
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movie Carousel */}
      <div className="movie-carousel">
        <div className="carousel-items">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="carousel-item">
              <img
                src={`https://via.placeholder.com/200x80/000000/FFFFFF?text=Promo+${item}`}
                alt={`Promo ${item}`}
                className="carousel-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
