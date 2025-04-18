"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { getAllMovies, deleteMovie } from "../../services/movieService"
import type { MovieProps } from "../../interfaces/movies"
import "../styles/admin-movies.css"

const AdminMovies: React.FC = () => {
    const [movies, setMovies] = useState<MovieProps[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async () => {
        try {
            setLoading(true)
            const result = await getAllMovies()
            if (result.success) {
                setMovies(result.data)
            } else {
                setError(result.message || "Failed to fetch movies")
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteClick = (movieId: number) => {
        setDeleteConfirm(movieId)
    }

    const handleDeleteConfirm = async (movieId: number) => {
        try {
            const result = await deleteMovie(movieId.toString())
            if (result.success) {
                setMovies(movies.filter((movie) => movie.movieId !== movieId))
                setSuccessMessage("Movie deleted successfully")
                setTimeout(() => setSuccessMessage(null), 3000)
            } else {
                setError(result.message || "Failed to delete movie")
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
                <span>Loading movies...</span>
            </div>
        )
    }

    return (
        <div className="admin-movies">
            {successMessage && <div className="admin-alert admin-alert-success">{successMessage}</div>}

            {error && <div className="admin-alert admin-alert-error">{error}</div>}

            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">Movies List</h2>
                    <Link to="/admin/movies/add" className="admin-button admin-button-primary">
                        <Plus size={16} />
                        <span>Add New Movie</span>
                    </Link>
                </div>

                {movies.length === 0 ? (
                    <div className="admin-empty-state">
                        <p>No movies found. Add your first movie to get started.</p>
                    </div>
                ) : (
                    <div className="admin-table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Poster</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Genre</th>
                                    <th>Duration</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie) => (
                                    <tr key={movie.movieId}>
                                        <td>{movie.movieId}</td>
                                        <td>
                                            <img
                                                src={movie.image || "/placeholder.svg"}
                                                alt={movie.title}
                                                className="admin-movie-thumbnail"
                                            />
                                        </td>
                                        <td>{movie.title}</td>
                                        <td>
                                            <span className={`admin-badge admin-badge-${movie.category.replace(/\s+/g, "-").toLowerCase()}`}>
                                                {movie.category}
                                            </span>
                                        </td>
                                        <td>{movie.genre}</td>
                                        <td>{movie.duration}</td>
                                        <td>
                                            <div className="admin-table-actions">
                                                <Link
                                                    to={`/movie/${movie.movieId}`}
                                                    className="admin-button admin-button-secondary"
                                                    target="_blank"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <Link
                                                    to={`/admin/movies/edit/${movie.movieId}`}
                                                    className="admin-button admin-button-secondary"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    className="admin-button admin-button-danger"
                                                    onClick={() => handleDeleteClick(movie.movieId)}
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
                        <p>Are you sure you want to delete this movie? This action cannot be undone.</p>
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

export default AdminMovies
