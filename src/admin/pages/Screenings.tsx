"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Edit, Trash2, Calendar } from "lucide-react"
import { getScreeningsByRoom } from "../../services/screeningService"
import { getCinemas, getRoomsByCinema } from "../../services/cinemaService"
import { getAllMovies } from "../../services/movieService"
import apiRoutes from "../../config/apiRoutes"
import "../styles/admin-screenings.css"

interface ScreeningData {
    screeningId: string
    movieId: string
    movieTitle: string
    cinemaId: string
    cinemaName: string
    roomId: string
    roomName: string
    startTime: string
}

const AdminScreenings: React.FC = () => {
    const [screenings, setScreenings] = useState<ScreeningData[]>([])
    const [cinemas, setCinemas] = useState<{ id: string; name: string }[]>([])
    const [rooms, setRooms] = useState<{ id: string; name: string }[]>([])
    const [movies, setMovies] = useState<{ id: string; title: string }[]>([])
    const [selectedCinema, setSelectedCinema] = useState<string>("")
    const [selectedRoom, setSelectedRoom] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        fetchCinemas()
        fetchMovies()
    }, [])

    useEffect(() => {
        if (selectedCinema) {
            fetchRooms(selectedCinema)
        } else {
            setRooms([])
            setSelectedRoom("")
        }
    }, [selectedCinema])

    useEffect(() => {
        if (selectedRoom) {
            fetchScreenings(selectedRoom)
        } else {
            setScreenings([])
        }
    }, [selectedRoom])

    const fetchCinemas = async () => {
        try {
            const result = await getCinemas()
            if (result.success) {
                setCinemas(
                    result.data.map((cinema: any) => ({
                        id: cinema.id,
                        name: cinema.name,
                    })),
                )
            }
        } catch (err) {
            console.error("Failed to fetch cinemas:", err)
        } finally {
            setLoading(false)
        }
    }

    const fetchRooms = async (cinemaId: string) => {
        try {
            setLoading(true)
            const result = await getRoomsByCinema(cinemaId)
            if (result.success) {
                setRooms(
                    result.data.map((room: any) => ({
                        id: room.id,
                        name: room.name,
                    })),
                )
            }
        } catch (err) {
            console.error("Failed to fetch rooms:", err)
        } finally {
            setLoading(false)
        }
    }

    const fetchMovies = async () => {
        try {
            const result = await getAllMovies()
            if (result.success) {
                setMovies(
                    result.data.map((movie: any) => ({
                        id: movie.movieId.toString(),
                        title: movie.title,
                    })),
                )
            }
        } catch (err) {
            console.error("Failed to fetch movies:", err)
        }
    }

    const fetchScreenings = async (roomId: string) => {
        try {
            setLoading(true)
            const result = await getScreeningsByRoom(roomId)
            if (result.success) {
                // Map the screenings to include movie and cinema names
                const mappedScreenings = result.data.map((screening: any) => {
                    const movie = movies.find((m) => m.id === screening.movieId.toString())
                    const cinema = cinemas.find((c) => c.id === screening.cinemaId)
                    const room = rooms.find((r) => r.id === screening.roomId)

                    return {
                        ...screening,
                        movieTitle: movie?.title || "Unknown Movie",
                        cinemaName: cinema?.name || "Unknown Cinema",
                        roomName: room?.name || "Unknown Room",
                    }
                })

                setScreenings(mappedScreenings)
            } else {
                setError(result.message || "Failed to fetch screenings")
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteClick = (screeningId: string) => {
        setDeleteConfirm(screeningId)
    }

    const handleDeleteConfirm = async (screeningId: string) => {
        try {
            const response = await fetch(apiRoutes.screenings.delete(screeningId), {
                method: "DELETE",
            })

            const result = await response.json()

            if (result.success) {
                setScreenings(screenings.filter((screening) => screening.screeningId !== screeningId))
                setSuccessMessage("Screening deleted successfully")
                setTimeout(() => setSuccessMessage(null), 3000)
            } else {
                setError(result.message || "Failed to delete screening")
                setTimeout(() => setError(null), 3000)
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
            setTimeout(() => setError(null), 3000)
        } finally {
            setDeleteConfirm(null)
        }
    }

    const handleDeleteCancel = () => {
        setDeleteConfirm(null)
    }

    const formatDateTime = (dateTimeStr: string) => {
        const date = new Date(dateTimeStr)
        return date.toLocaleString()
    }

    return (
        <div className="admin-screenings">
            {successMessage && <div className="admin-alert admin-alert-success">{successMessage}</div>}

            {error && <div className="admin-alert admin-alert-error">{error}</div>}

            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">Screenings Management</h2>
                    <Link to="/admin/screenings/add" className="admin-button admin-button-primary">
                        <Plus size={16} />
                        <span>Add New Screening</span>
                    </Link>
                </div>

                <div className="admin-filters">
                    <div className="admin-filter-group">
                        <label>Cinema:</label>
                        <select
                            value={selectedCinema}
                            onChange={(e) => setSelectedCinema(e.target.value)}
                            className="admin-form-select"
                        >
                            <option value="">Select Cinema</option>
                            {cinemas.map((cinema) => (
                                <option key={cinema.id} value={cinema.id}>
                                    {cinema.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="admin-filter-group">
                        <label>Room:</label>
                        <select
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                            className="admin-form-select"
                            disabled={!selectedCinema}
                        >
                            <option value="">Select Room</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="admin-loading">
                        <div className="admin-loading-spinner"></div>
                        <span>Loading screenings...</span>
                    </div>
                ) : !selectedRoom ? (
                    <div className="admin-empty-state">
                        <Calendar size={48} className="admin-empty-icon" />
                        <p>Please select a cinema and room to view screenings.</p>
                    </div>
                ) : screenings.length === 0 ? (
                    <div className="admin-empty-state">
                        <Calendar size={48} className="admin-empty-icon" />
                        <p>No screenings found for this room. Add your first screening to get started.</p>
                    </div>
                ) : (
                    <div className="admin-table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Movie</th>
                                    <th>Cinema</th>
                                    <th>Room</th>
                                    <th>Date & Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {screenings.map((screening) => (
                                    <tr key={screening.screeningId}>
                                        <td>{screening.screeningId}</td>
                                        <td>{screening.movieTitle}</td>
                                        <td>{screening.cinemaName}</td>
                                        <td>{screening.roomName}</td>
                                        <td>{formatDateTime(screening.startTime)}</td>
                                        <td>
                                            <div className="admin-table-actions">
                                                <Link
                                                    to={`/admin/screenings/edit/${screening.screeningId}`}
                                                    className="admin-button admin-button-secondary"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    className="admin-button admin-button-danger"
                                                    onClick={() => handleDeleteClick(screening.screeningId)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {deleteConfirm && (
                <div className="admin-modal-backdrop">
                    <div className="admin-modal">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this screening? This action cannot be undone.</p>
                        <div className="admin-modal-actions">
                            <button className="admin-button admin-button-secondary" onClick={handleDeleteCancel}>
                                Cancel
                            </button>
                            <button className="admin-button admin-button-danger" onClick={() => handleDeleteConfirm(deleteConfirm)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminScreenings
