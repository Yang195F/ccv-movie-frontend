import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import ChartLeft from "../components/ChartLeft";
import ChartRight from "../components/ChartRight";
import FilterListbox from "../components/FilterListbox";
import PosterSlider from "../components/PosterSlider";
import "../styles/dashboard.css"; 

const DashboardAdmin: React.FC = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="dashboard-container p-6 bg-gray-100 min-h-screen">
        {/* Charts Row */}
        <div className="charts-row grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartLeft />
          <ChartRight />
        </div>

        {/* Movie Section */}
        <div className="movie-section">
          <FilterListbox />
          <PosterSlider />
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
