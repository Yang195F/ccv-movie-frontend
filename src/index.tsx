import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./admins/pages/LoginPage";
import AddMovie from "./admins/pages/AddMovie";
import ManageShow from "./admins/pages/ManageShowTime";
import BookingManagement from "./admins/pages/BookingManagement";
import DashboardAdmin from "./admins/pages/DashboardAdmin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/manageshow" element={<ManageShow />} />
        <Route path="/bookingmanagement" element={<BookingManagement />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
