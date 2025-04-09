import React from "react";
import { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SalesReport from "../../components/SalesReport";
import MovieReport from "../../components/MovieReport";

const MonthlyReport: React.FC = () => {
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
            </div>
        </div>
    );
};

export default MonthlyReport;
