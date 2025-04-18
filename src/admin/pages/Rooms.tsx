"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react"
import { getCinemaById, getRoomsByCinema, deleteRoom } from "../../services/cinemaService"
import type { CinemaRoomProps } from "../../interfaces/cinema_rooms"
import "../styles/admin-rooms.css"

const AdminRooms: React.FC = () => {
    const { cinemaId } = useParams<{ cinemaId: string }>()
    const navigate = useNavigate()

    const [cinemaName, setCinemaName] = useState("")
    const [rooms, setRooms] = useState<CinemaRoomProps[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        if (!cinemaId) {
            navigate("/admin/cinemas")
            return
        }

        fetchCinemaAndRooms()
    }, [cinemaId])

    const fetchCinemaAndRooms = async () => {
        try {
            setLoading(true)

            // Fetch cinema details
            const cinemaResult = await getCinemaById(cinemaId!)
            if (cinemaResult.success) {
                setCinemaName(cinemaResult.data.name)
            }

            // Fetch rooms
            const roomsResult = await getRoomsByCinema(cinemaId!)
            if (roomsResult.success) {
                setRooms(roomsResult.data)
            } else {
                setError(roomsResult.message || "Failed to fetch rooms")
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteClick = (roomId: string) => {
        setDeleteConfirm(roomId)
    }

    const handleDeleteConfirm = async (roomId: string) => {
        try {
            const result = await deleteRoom(roomId)
            if (result.success) {
                setRooms(rooms.filter((room) => room.id !== roomId))
                setSuccessMessage("Room deleted successfully")
                setTimeout(() => setSuccessMessage(null), 3000)
            } else {
                setError(result.message || "Failed to delete room")
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

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="admin-loading-spinner"></div>
                <span>Loading rooms...</span>
            </div>
        )
    }

    return (
        <div className="admin-rooms">
            {successMessage && <div className="admin-alert admin-alert-success">{successMessage}</div>}

            {error && <div className="admin-alert admin-alert-error">{error}</div>}

            <div className="admin-card">
                <div className="admin-card-header">
                    <div className="admin-header-left">
                        <button className="admin-button admin-button-secondary" onClick={() => navigate("/admin/cinemas")}>
                            <ArrowLeft size={16} />
                            <span>Back to Cinemas</span>
                        </button>
                        <h2 className="admin-card-title">Rooms for {cinemaName}</h2>
                    </div>
                    <Link to={`/admin/rooms/add?cinemaId=${cinemaId}`} className="admin-button admin-button-primary">
                        <Plus size={16} />
                        <span>Add New Room</span>
                    </Link>
                </div>

                {rooms.length === 0 ? (
                    <div className="admin-empty-state">
                        <p>No rooms found for this cinema. Add your first room to get started.</p>
                    </div>
                ) : (
                    <div className="admin-table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Layout Type</th>
                                    <th>Seats</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room) => (
                                    <tr key={room.id}>
                                        <td>{room.id}</td>
                                        <td>{room.name}</td>
                                        <td>
                                            <span className={`admin-badge admin-badge-${room.layoutType.toLowerCase()}`}>
                                                {room.layoutType}
                                            </span>
                                        </td>
                                        <td>{room.seatGrid?.flat().length || 0} seats</td>
                                        <td>
                                            <div className="admin-table-actions">
                                                <Link to={`/admin/rooms/edit/${room.id}`} className="admin-button admin-button-secondary">
                                                    <Edit size={16} />
                                                </Link>
                                                <button className="admin-button admin-button-danger" onClick={() => handleDeleteClick(room.id)}>
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
                        <p>
                            Are you sure you want to delete this room? This will also delete all associated screenings. This action
                            cannot be undone.
                        </p>
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

export default AdminRooms
