"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import HeroSlideshow from "../../components/HeroSlideshow"
import MovieTabs from "../../components/MovieTabs"
import MovieGrid from "../../components/MovieGrid"

import type { MovieProps } from "../../interfaces/movies"
import { getAllMovies } from "../../services/movieService"
import "../styles/landing_page.css"

const TABS: string[] = ["NOW SHOWING", "BOOK EARLY", "COMING SOON", "ALL"]

const CinemaWebsite: React.FC = () => {
  const [activeTab, setActiveTab] = useState("NOW SHOWING")
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await getAllMovies()
        if (result.success) {
          setMovies(result.data)
        } else {
          setError(result.message || "Failed to load movie data.")
        }
      } catch (err) {
        setError("Failed to load movie data.")
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const handleTabChange = (tab: string) => {
    if (tab === "ALL") navigate("/movies")
    else setActiveTab(tab)
  }

  if (loading)
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    )
  if (error) return <div className="error-container">{error}</div>

  const nowShowingMovies = movies.filter((m) => m.category === "NOW SHOWING")
  const comingSoonMovies = movies.filter((m) => m.category === "COMING SOON")
  const featuredMovies = movies.filter((m) => m.banner).slice(0, 3)

  return (
    <div className="cinema-page">
      <Navbar />

      <HeroSlideshow movies={movies.filter((m) => m.banner)} />

      <section className="features-section">
        <div className="features-container">
          <div className="feature">
            <div className="feature-icon">🎬</div>
            <h3>Latest Movies</h3>
            <p>Watch the latest blockbusters in stunning quality</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🍿</div>
            <h3>Premium Experience</h3>
            <p>Enjoy comfortable seating and gourmet concessions</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📱</div>
            <h3>Easy Booking</h3>
            <p>Book tickets online with just a few clicks</p>
          </div>
        </div>
      </section>

      <section className="movie-tabs-section">
        <h2 className="section-title">Movies</h2>
        <MovieTabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
        <MovieGrid movies={movies.filter((m) => m.category === activeTab)} />
      </section>

      {featuredMovies.length > 0 && (
        <section className="featured-section">
          <div className="featured-container">
            <h2 className="section-title">Featured Movies</h2>
            <div className="featured-grid">
              {featuredMovies.map((movie) => (
                <div key={movie.movieId} className="featured-card" onClick={() => navigate(`/movie/${movie.movieId}`)}>
                  <div className="featured-image" style={{ backgroundImage: `url(${movie.banner})` }}>
                    <div className="featured-overlay">
                      <h3>{movie.title}</h3>
                      <p>{movie.genre}</p>
                      {movie.hasBookNow && <button className="book-now-btn">Book Now</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="promo-section">
        <div className="promo-container">
          <div className="promo-content">
            <h2>Join MovieClub</h2>
            <p>Get exclusive discounts, early access to tickets, and special promotions.</p>
            <button className="promo-button">Sign Up Now</button>
          </div>
          <div className="promo-image" style={{ backgroundImage: "url('https://imgur.com/WAekdBQ.jpg')" }}></div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CinemaWebsite
