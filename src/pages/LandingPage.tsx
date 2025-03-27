import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import "../styles/landing_page.css";

interface MovieProps {
  id: number;
  title: string;
  image: string;
  tag?: string;
  tagColor?: string;
  rating: string;
  hasBookNow?: boolean;
  date?: string;
  releaseDate?: string;
}

interface HeroSlideProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

interface CinemaProps {
  id: string;
  name: string;
}

const CinemaWebsite: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("NOW SHOWING");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showCinemaDropdown, setShowCinemaDropdown] = useState<boolean>(false);

  const tabs: string[] = [
    "NOW SHOWING",
    "KIDS SPECIAL",
    "BOOK EARLY",
    "COMING SOON",
    "GEMBIRAYA",
  ];

  const heroSlides: HeroSlideProps[] = [
    {
      id: 1,
      title: "Welcome to YourCinema",
      subtitle: "Experience the magic of movies like never before!",
      image: "assets/banner.png",
      buttonText: "Book Tickets Now",
      buttonLink: "/movies",
    },
    {
      id: 2,
      title: "New Releases Every Week",
      subtitle: "Be the first to watch the latest blockbusters",
      image: "assets/banner2.png",
      buttonText: "View Schedule",
      buttonLink: "/schedule",
    },
    {
      id: 3,
      title: "Premium Experience",
      subtitle: "Luxury seating and state-of-the-art sound systems",
      image: "assets/banner3.png",
      buttonText: "Explore Cinemas",
      buttonLink: "/cinemas",
    },
  ];

  const movies: MovieProps[] = [
    {
      id: 1,
      title: "NE ZHA 2 哪吒之魔童闯海",
      image: "assets/movie1.png",
      tag: "2X MOVIEMONEY",
      tagColor: "tag-red",
      rating: "P12",
      hasBookNow: true,
      date: "13.03.25",
    },
    {
      id: 2,
      title: "SNOW WHITE",
      image: "assets/movie2.png",
      tag: "BOOK EARLY",
      tagColor: "tag-white",
      rating: "P12",
    },
    {
      id: 3,
      title: "PETAKA GUNUNG GEDE",
      image: "assets/movie3.png",
      tag: "BOOK EARLY",
      tagColor: "tag-white",
      rating: "15",
    },
    {
      id: 4,
      title: "A MINECRAFT MOVIE",
      image: "assets/movie4.png",
      releaseDate: "3 APRIL 2025",
      rating: "P12",
    },
    {
      id: 5,
      title: "SEVENTEEN [RIGHT HERE] WORLD TOUR IN CINEMAS",
      image: "https://via.placeholder.com/350x500",
      tag: "SALUTEEE!",
      tagColor: "tag-white",
      rating: "P12",
    },
    {
      id: 6,
      title: "SIKAN...",
      image: "https://via.placeholder.com/350x500",
      rating: "15",
    },
  ];

  // Available cinemas for navigation
  const cinemas: CinemaProps[] = [
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

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const navigateToCinema = (cinemaId: string, movieId?: number) => {
    const path = `/showtimes/${cinemaId}${movieId ? `?movie=${movieId}` : ""}`;
    navigate(path);
  };

  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="cinema-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <a href="/" className="logo">
            YourCinema
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
          <a href="/movies" className="nav-link">
            MOVIES
          </a>
          <a href="/cinemas" className="nav-link">
            CINEMAS
          </a>
          <a href="/food-drinks" className="nav-link">
            FOOD & DRINKS
          </a>
          <a href="/booking" className="nav-link">
            PROMOTIONS
          </a>
          <div className="dropdown">
            <button className="nav-link dropdown-toggle">
              MORE
              <span className="dropdown-arrow">▼</span>
            </button>
          </div>
        </nav>

        <a href="/login" className="sign-in-button">
          <span className="user-icon">👤</span>
          SIGN IN
        </a>
      </header>

      {/* Hero Slideshow */}
      <section className="hero-slideshow">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`,
            }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button
                className="hero-button"
                onClick={() => handleButtonClick(slide.buttonLink)}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Movie Tabs */}
      <div className="movie-tabs-container">
        <div className="movie-tabs-wrapper">
          <div className="movie-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <a href="/all-movies" className="view-all-link">
            VIEW ALL
            <span className="arrow-icon">→</span>
          </a>
        </div>

        {/* Movie Grid */}
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              {/* Movie Poster */}
              <div className="movie-poster">
                <img
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  className="poster-image"
                />

                {/* Tags */}
                {movie.tag && (
                  <div className={`movie-tag ${movie.tagColor}`}>
                    {movie.tag}
                  </div>
                )}

                {/* Release Date */}
                {movie.releaseDate && (
                  <div className="release-date">{movie.releaseDate}</div>
                )}

                {/* Date for NE ZHA 2 */}
                {movie.date && <div className="movie-date">{movie.date}</div>}

                {/* Rating */}
                <div
                  className={`movie-rating ${
                    movie.rating === "15" ? "rating-15" : "rating-p12"
                  }`}
                >
                  {movie.rating}
                </div>

                {/* Book Now Button */}
                {movie.hasBookNow && (
                  <div className="book-now-container">
                    <button
                      className="book-now-button"
                      onClick={() => navigateToCinema("1utama", movie.id)}
                    >
                      BOOK NOW
                    </button>
                  </div>
                )}
              </div>

              {/* Movie Title */}
              <div
                className="movie-title"
                onClick={() => navigateToCinema("1utama", movie.id)}
              >
                <h3>{movie.title}</h3>
              </div>
            </div>
          ))}

          {/* Carousel Navigation */}
          <button className="carousel-nav-button">
            <span className="carousel-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CinemaWebsite;
