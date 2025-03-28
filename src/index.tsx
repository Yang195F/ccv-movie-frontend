import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import AddMovie from "./pages/AddMovie"; // Import AdminDashboard

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/addmovie" element={<AddMovie />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
