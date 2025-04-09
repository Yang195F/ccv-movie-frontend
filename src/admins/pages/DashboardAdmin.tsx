import React from "react";
import { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SalesReport from "../../components/SalesReport";
import MovieReport from "../../components/MovieReport";
import FilterListbox from "../../components/FilterListbox";
import PosterSlider from "../../components/PosterSlider";
import "../styles/dashboard.css";

const DashboardAdmin: React.FC = () => {
  const [filter, setFilter] = useState("today")

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  return (
    <div className="dashboard-page">
      <NavbarAdmin />
      <div className="dashboard-content">
        {/* Charts Row */}
        <div className="charts-container">
          <div className="chart-box">
            <h2 className="chart-title">Sales Report :</h2>
            <div className="chart-content">
              <SalesReport />
            </div>
          </div>

          <div className="chart-box">
            <h2 className="chart-title">Movie Report :</h2>
            <div className="chart-content">
              <MovieReport />
            </div>
          </div>
        </div>

        {/* Movie Section */}
        <div className="movie-section">
          <div className="movie-filter">
            <label>Movies :</label>
            <FilterListbox onFilterChange={handleFilterChange} />
          </div>

          <div className="poster-container">
            <PosterSlider filter={filter} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin