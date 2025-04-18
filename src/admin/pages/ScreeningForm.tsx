"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { getScreeningWithSeats } from "../../services/screeningService"
import { getCinemas, getRoomsByCinema } from "../../services/cinemaService"
import { getAllMovies } from "../../services/movieService"
import apiRoutes from "../../config/apiRoutes"
import "../styles/admin-forms.css"

interface ScreeningFormData {
    movieId: string
    roomId: string
    startTime: string
}

const AdminScreeningForm: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const isEditMode = !!id

    const [formData, setFormData] = useState<ScreeningFormData>({
        movieId: "",
        roomId: "",
        startTime: "",
    })

    const [cinemas, setCinemas] = useState<{ id: string; name: string }[]>([])
    const [rooms, setRooms] = useState<{ id: string; name: string; cinemaId: string }[]>([])
    const [movies, setMovies] = useState<{ id: string; title: string }[]>([])
    const [selectedCinema, setSelectedCinema] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        fetchCinemas()
        fetchMovies()

        if (isEditMode) {
            fetchScreeningData()
        }
    }, [id])

    useEffect(() => {
        if (selectedCinema) {
            fetchRooms(selectedCinema)
        } else {
            setRooms([])
        }
    }, [selectedCinema])

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
            if (!isEditMode) {
                setLoading(false)
            }
        }
    }

    const fetchRooms = async (cinemaId: string) => {
        try {
            const result = await getRoomsByCinema(cinemaId)
            if (result.success) {
                setRooms(
                    result.data.map((room: any) => ({
                        id: room.id,
                        name: room.name,
                        cinemaId: cinemaId,
                    })),
                )
            }
        } catch (err) {
            console.error("Failed to fetch rooms:", err)
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

    const fetchScreeningData = async () => {
        try {
            setLoading(true)
            const result = await getScreeningWithSeats(id!)
            if (result.success) {
                const screening = result.data

                // Format the date for the datetime-local input
                const startTime = new Date(screening.startTime)
                const formattedDate = startTime.toISOString().slice(0, 16)

                setFormData({
                    movieId: screening.movieId,
                    roomId: screening.roomId,
                    startTime: formattedDate,
                })

                // Find the cinema for this room
                const room = rooms.find((r) => r.id === screening.roomId)
                if (room) {
                    setSelectedCinema(room.cinemaId)
                } else {
                    // If we don't have the room yet, we need to fetch all rooms
                    const allCinemasResult = await getCinemas()
                    if (allCinemasResult.success) {
                        for (const cinema of allCinemasResult.data) {
                            const roomsResult = await getRoomsByCinema(cinema.id)
                            if (roomsResult.success) {
                                const foundRoom = roomsResult.data.find((r: any) => r.id === screening.roomId)
                                if (foundRoom) {
                                    setSelectedCinema(cinema.id)
                                    setRooms(
                                        roomsResult.data.map((r: any) => ({
                                            id: r.id,
                                            name: r.name,
                                            cinemaId: cinema.id,
                                        })),
                                    )
                                    break
                                }
                            }
                        }
                    }
                }
            } else {
                setError(result.message || "Failed to fetch screening data")
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleCinemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCinema(e.target.value)
        // Reset room selection when cinema changes
        setFormData({
            ...formData,
            roomId: "",
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        try {
            if (isEditMode) {
                // Update existing screening
                const response = await fetch(apiRoutes.screenings.update(id!), {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })

                const result = await response.json()

                if (result.success) {
                    setSuccess("Screening updated successfully")
                    setTimeout(() => navigate("/admin/screenings"), 1500)
                } else {
                    setError(result.message || "Failed to update screening")
                }
            } else {
                // Add new screening
                const response = await fetch(apiRoutes.screenings.add, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })

                const result = await response.json()

                if (result.success) {
                    setSuccess("Screening added successfully")
                    setTimeout(() => navigate("/admin/screenings"), 1500)
                } else {
                    setError(result.message || "Failed to add screening")
                }
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        }
    }

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="admin-loading-spinner"></div>
                <span>Loading screening data...</span>
            </div>
        )
    }

    return (
        <div className="admin-form-container">
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            {success && <div className="admin-alert admin-alert-success">{success}</div>}

            <div className="admin-card">
                <div className="admin-card-header">
                    <button className="admin-button admin-button-secondary" onClick={() => navigate("/admin/screenings")}>
                        <ArrowLeft size={16} />
                        <span>Back to Screenings</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="admin-form-group">
                        <label className="admin-form-label">Movie</label>
                        <select
                            name="movieId"
                            value={formData.movieId}
                            onChange={handleChange}
                            className="admin-form-select"
                            required
                        >
                            <option value="">Select Movie</option>
                            {movies.map((movie) => (
                                <option key={movie.id} value={movie.id}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-form-label">Cinema</label>
                        <select value={selectedCinema} onChange={handleCinemaChange} className="admin-form-select" required>
                            <option value="">Select Cinema</option>
                            {cinemas.map((cinema) => (
                                <option key={cinema.id} value={cinema.id}>
                                    {cinema.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-form-label">Room</label>
                        <select
                            name="roomId"
                            value={formData.roomId}
                            onChange={handleChange}
                            className="admin-form-select"
                            required
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

                    <div className="admin-form-group">
                        <label className="admin-form-label">Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            className="admin-form-input"
                            required
                        />
                    </div>

                    <div className="admin-form-actions">
                        <button
                            type="button"
                            className="admin-button admin-button-secondary"
                            onClick={() => navigate("/admin/screenings")}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="admin-button admin-button-primary">
                            <Save size={16} />
                            <span>{isEditMode ? "Update Screening" : "Add Screening"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminScreeningForm
