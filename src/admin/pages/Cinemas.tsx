"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Edit, Trash2, Home } from "lucide-react"
import { getCinemas, deleteCinema } from "../../services/cinemaService"
import type { CinemaProps } from "../../interfaces/cinemas"
import "../styles/admin-cinema.css";

const AdminCinemas: React.FC = () => {
    const [cinemas, setCinemas] = useState<CinemaProps[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        fetchCinemas()
    }, [])

    const fetchCinemas = async () => {
        try {
            setLoading(true)
            const result = await getCinemas()
            if (result.success) {
                setCinemas(result.data)
            } else {
                setError(result.message || "Failed to fetch cinemas")
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteClick = (cinemaId: string) => {
        setDeleteConfirm(cinemaId)
    }

    const handleDeleteConfirm = async (cinemaId: string) => {
        try {
            const result = await deleteCinema(cinemaId)
            if (result.success) {
                setCinemas(cinemas.filter((cinema) => cinema.id !== cinemaId))
                setSuccessMessage("Cinema deleted successfully")
                setTimeout(() => setSuccessMessage(null), 3000)
            } else {
                setError(result.message || "Failed to delete cinema")
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
                <span>Loading cinemas...</span>
            </div>
        )
    }

    return (
        <div className="admin-cinemas">
            {successMessage && <div className="admin-alert admin-alert-success">{successMessage}</div>}

            {error && <div className="admin-alert admin-alert-error">{error}</div>}

            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">Cinemas List</h2>
                    <Link to="/admin/cinemas/add" className="admin-button admin-button-primary">
                        <Plus size={16} />
                        <span>Add New Cinema</span>
                    </Link>
                </div>

                {cinemas.length === 0 ? (
                    <div className="admin-empty-state">
                        <p>No cinemas found. Add your first cinema to get started.</p>
                    </div>
                ) : (
                    <div className="admin-table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Rooms</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cinemas.map((cinema) => (
                                    <tr key={cinema.id}>
                                        <td>{cinema.id}</td>
                                        <td>{cinema.name}</td>
                                        <td>{cinema.cinemaRooms?.length || 0} rooms</td>
                                        <td>
                                            <div className="admin-table-actions">
                                                <Link to={`/admin/rooms/${cinema.id}`} className="admin-button admin-button-secondary">
                                                    <Home size={16} />
                                                </Link>
                                                <Link to={`/admin/cinemas/edit/${cinema.id}`} className="admin-button admin-button-secondary">
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    className="admin-button admin-button-danger"
                                                    onClick={() => handleDeleteClick(cinema.id)}
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
                        <p>
                            Are you sure you want to delete this cinema? This will also delete all associated rooms and screenings.
                            This action cannot be undone.
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

export default AdminCinemas
