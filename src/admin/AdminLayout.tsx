"use client"

import React, { type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Film, Home, MapPin, Calendar, LogOut, Menu, X } from "lucide-react"
import "./styles/admin-layout.css"

interface AdminLayoutProps {
    children: ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const location = useLocation()
    const [menuOpen, setMenuOpen] = React.useState(false)

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`)
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <div className="admin-layout">
            <div className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <h2>MovieClub Admin</h2>
                    <button className="close-menu" onClick={toggleMenu}>
                        <X size={24} />
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin" className={isActive("/admin") ? "active" : ""}>
                        <Home size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/movies" className={isActive("/admin/movies") ? "active" : ""}>
                        <Film size={20} />
                        <span>Movies</span>
                    </Link>
                    <Link to="/admin/cinemas" className={isActive("/admin/cinemas") ? "active" : ""}>
                        <MapPin size={20} />
                        <span>Cinemas</span>
                    </Link>
                    <Link to="/admin/screenings" className={isActive("/admin/screenings") ? "active" : ""}>
                        <Calendar size={20} />
                        <span>Screenings</span>
                    </Link>
                </nav>
                <div className="sidebar-footer">
                    <Link to="/" className="logout-button">
                        <LogOut size={20} />
                        <span>Back to Site</span>
                    </Link>
                </div>
            </div>

            <div className="admin-content">
                <header className="admin-header">
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <Menu size={24} />
                    </button>
                    <div className="header-title">
                        {location.pathname === "/admin" && <h1>Dashboard</h1>}
                        {location.pathname === "/admin/movies" && <h1>Movies Management</h1>}
                        {location.pathname === "/admin/cinemas" && <h1>Cinemas Management</h1>}
                        {location.pathname === "/admin/screenings" && <h1>Screenings Management</h1>}
                        {location.pathname.startsWith("/admin/movies/edit/") && <h1>Edit Movie</h1>}
                        {location.pathname.startsWith("/admin/cinemas/edit/") && <h1>Edit Cinema</h1>}
                        {location.pathname.startsWith("/admin/rooms/edit/") && <h1>Edit Room</h1>}
                        {location.pathname.startsWith("/admin/screenings/edit/") && <h1>Edit Screening</h1>}
                        {location.pathname === "/admin/movies/add" && <h1>Add New Movie</h1>}
                        {location.pathname === "/admin/cinemas/add" && <h1>Add New Cinema</h1>}
                        {location.pathname === "/admin/rooms/add" && <h1>Add New Room</h1>}
                        {location.pathname === "/admin/screenings/add" && <h1>Add New Screening</h1>}
                    </div>
                    <div className="header-actions">
                        <span className="admin-user">Admin User</span>
                    </div>
                </header>
                <main className="admin-main">{children}</main>
            </div>
        </div>
    )
}

export default AdminLayout
