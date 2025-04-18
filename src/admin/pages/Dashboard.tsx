"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Film, MapPin, Calendar, Users } from "lucide-react"
import { getAllMovies } from "../../services/movieService"
import { getCinemas } from "../../services/cinemaService"
import { Link } from "react-router-dom"
import "../styles/admin-dashboard.css"

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        movies: 0,
        cinemas: 0,
        screenings: 0,
        users: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch movies count
                const moviesResult = await getAllMovies()

                // Fetch cinemas count
                const cinemasResult = await getCinemas()

                // Update stats
                setStats({
                    movies: moviesResult.success ? moviesResult.data.length : 0,
                    cinemas: cinemasResult.success ? cinemasResult.data.length : 0,
                    screenings: 0, // This would need a separate API call
                    users: 0, // This would need a separate API call
                })
            } catch (error) {
                console.error("Error fetching dashboard stats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="admin-loading-spinner"></div>
                <span>Loading dashboard data...</span>
            </div>
        )
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard-grid">
                <div className="admin-stat-card">
                    <div className="admin-stat-icon">
                        <Film size={20} />
                    </div>
                    <div className="admin-stat-title">Total Movies</div>
                    <div className="admin-stat-value">{stats.movies}</div>
                    <Link to="/admin/movies" className="admin-stat-link">
                        Manage Movies
                    </Link>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon">
                        <MapPin size={20} />
                    </div>
                    <div className="admin-stat-title">Total Cinemas</div>
                    <div className="admin-stat-value">{stats.cinemas}</div>
                    <Link to="/admin/cinemas" className="admin-stat-link">
                        Manage Cinemas
                    </Link>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon">
                        <Calendar size={20} />
                    </div>
                    <div className="admin-stat-title">Total Screenings</div>
                    <div className="admin-stat-value">{stats.screenings}</div>
                    <Link to="/admin/screenings" className="admin-stat-link">
                        Manage Screenings
                    </Link>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon">
                        <Users size={20} />
                    </div>
                    <div className="admin-stat-title">Total Users</div>
                    <div className="admin-stat-value">{stats.users}</div>
                    <Link to="/admin/users" className="admin-stat-link">
                        Manage Users
                    </Link>
                </div>
            </div>

            <div className="admin-dashboard-actions">
                <div className="admin-card">
                    <h2 className="admin-card-title">Quick Actions</h2>
                    <div className="admin-quick-actions">
                        <Link to="/admin/movies/add" className="admin-quick-action">
                            <Film size={20} />
                            <span>Add New Movie</span>
                        </Link>
                        <Link to="/admin/cinemas/add" className="admin-quick-action">
                            <MapPin size={20} />
                            <span>Add New Cinema</span>
                        </Link>
                        <Link to="/admin/screenings/add" className="admin-quick-action">
                            <Calendar size={20} />
                            <span>Add New Screening</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
