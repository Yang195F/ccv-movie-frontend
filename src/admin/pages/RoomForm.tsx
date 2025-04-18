"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { getRoomDetails, getCinemas } from "../../services/cinemaService"
import apiRoutes from "../../config/apiRoutes"
import "../styles/admin-forms.css"

interface RoomFormData {
    cinemaName: string
    roomName: string
    layoutType: string
}

const AdminRoomForm: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const location = useLocation()
    const isEditMode = !!id

    // Get cinemaId from query params if adding a new room
    const queryParams = new URLSearchParams(location.search)
    const cinemaIdFromQuery = queryParams.get("cinemaId")

    const [formData, setFormData] = useState<RoomFormData>({
        cinemaName: "",
        roomName: "",
        layoutType: "IMAX",
    })

    const [cinemas, setCinemas] = useState<{ id: string; name: string }[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        fetchCinemas()

        if (isEditMode) {
            fetchRoomData()
        } else if (cinemaIdFromQuery) {
            // If we have a cinemaId from query params, find the cinema name
            fetchCinemaName(cinemaIdFromQuery)
        }
    }, [id, cinemaIdFromQuery])

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
        }
    }

    const fetchCinemaName = async (cinemaId: string) => {
        try {
            const result = await getCinemas()
            if (result.success) {
                const cinema = result.data.find((c: any) => c.id === cinemaId)
                if (cinema) {
                    setFormData((prev) => ({
                        ...prev,
                        cinemaName: cinema.name,
                    }))
                }
            }
        } catch (err) {
            console.error("Failed to fetch cinema name:", err)
        } finally {
            setLoading(false)
        }
    }

    const fetchRoomData = async () => {
        try {
            setLoading(true)
            const result = await getRoomDetails(id!)
            if (result.success) {
                const room = result.data
                setFormData({
                    cinemaName: room.cinemaName || "",
                    roomName: room.name,
                    layoutType: room.layoutType,
                })
            } else {
                setError(result.message || "Failed to fetch room data")
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        try {
            if (isEditMode) {
                // Update existing room
                const response = await fetch(apiRoutes.cinemas.updateRoom(id!), {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        newName: formData.roomName,
                        layoutType: formData.layoutType,
                    }),
                })

                const result = await response.json()

                if (result.success) {
                    setSuccess("Room updated successfully")
                    setTimeout(() => navigate(-1), 1500)
                } else {
                    setError(result.message || "Failed to update room")
                }
            } else {
                // Add new room
                const response = await fetch(apiRoutes.cinemas.addRoom, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })

                const result = await response.json()

                if (result.success) {
                    setSuccess("Room added successfully")
                    setTimeout(() => {
                        if (cinemaIdFromQuery) {
                            navigate(`/admin/rooms/${cinemaIdFromQuery}`)
                        } else {
                            navigate("/admin/cinemas")
                        }
                    }, 1500)
                } else {
                    setError(result.message || "Failed to add room")
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
                <span>Loading room data...</span>
            </div>
        )
    }

    return (
        <div className="admin-form-container">
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            {success && <div className="admin-alert admin-alert-success">{success}</div>}

            <div className="admin-card">
                <div className="admin-card-header">
                    <button className="admin-button admin-button-secondary" onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} />
                        <span>Back</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="admin-form-group">
                        <label className="admin-form-label">Cinema</label>
                        {isEditMode ? (
                            <input type="text" value={formData.cinemaName} className="admin-form-input" disabled />
                        ) : (
                            <select
                                name="cinemaName"
                                value={formData.cinemaName}
                                onChange={handleChange}
                                className="admin-form-select"
                                required
                                disabled={!!cinemaIdFromQuery}
                            >
                                <option value="">Select Cinema</option>
                                {cinemas.map((cinema) => (
                                    <option key={cinema.id} value={cinema.name}>
                                        {cinema.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-form-label">Room Name</label>
                        <input
                            type="text"
                            name="roomName"
                            value={formData.roomName}
                            onChange={handleChange}
                            className="admin-form-input"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-form-label">Layout Type</label>
                        <select
                            name="layoutType"
                            value={formData.layoutType}
                            onChange={handleChange}
                            className="admin-form-select"
                            required
                        >
                            <option value="IMAX">IMAX</option>
                            <option value="LUX">LUX</option>
                            <option value="INDULGE">INDULGE</option>
                        </select>
                    </div>

                    <div className="admin-form-actions">
                        <button type="button" className="admin-button admin-button-secondary" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button type="submit" className="admin-button admin-button-primary">
                            <Save size={16} />
                            <span>{isEditMode ? "Update Room" : "Add Room"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminRoomForm
