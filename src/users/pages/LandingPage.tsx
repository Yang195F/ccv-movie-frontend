import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSlideshow from "../../components/HeroSlideshow";
import MovieTabs from "../../components/MovieTabs";
import MovieGrid from "../../components/MovieGrid";

import { MovieProps } from "../../interfaces/movies";
import { getAllMovies } from "../../services/movieService";

const TABS: string[] = ["NOW SHOWING", "BOOK EARLY", "COMING SOON", "ALL"];

const CinemaWebsite: React.FC = () => {
  const [activeTab, setActiveTab] = useState("NOW SHOWING");
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await getAllMovies();
        if (result.success) {
          setMovies(result.data);
        } else {
          setError(result.message || "Failed to load movie data.");
        }
      } catch (err) {
        setError("Failed to load movie data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === "ALL") navigate("/movies");
    else setActiveTab(tab);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cinema-page">
      <Navbar />

      <HeroSlideshow movies={movies.filter((m) => m.banner)} />

      <section className="movie-tabs-section">
        <MovieTabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
        <MovieGrid movies={movies.filter((m) => m.category === activeTab)} />
      </section>

      <Footer />
    </div>
  );
};

export default CinemaWebsite;
