import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./admins/pages/LoginPage";
import AddMovie from "./admins/pages/AddMovie";
import UpdateMovie from "./admins/pages/UpdateMovie";
import BookingManagement from "./admins/pages/BookingManagement";
import DashboardAdmin from "./admins/pages/DashboardAdmin";
import MonthlyReport from "./admins/pages/MonthlyReport";
import Schedule from "./admins/pages/Schedule";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/updatemovie" element={<UpdateMovie />} />
        <Route path="/bookingmanagement" element={<BookingManagement />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/monthlyreport" element={<MonthlyReport />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
