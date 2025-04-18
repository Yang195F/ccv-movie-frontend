"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { getMovieById, updateMovie } from "../../services/movieService"
import apiRoutes from "../../config/apiRoutes"
import "../styles/admin-forms.css"

interface MovieFormData {
    title: string
    image: string
    banner: string
    rating: string
    category: string
    hasBookNow: boolean
    releaseDate: string
    genre: string
    languages: string
    duration: string
    ticketPrice: number
}

const AdminMovieForm: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const isEditMode = !!id

    const [formData, setFormData] = useState<MovieFormData>({
        title: "",
        image: "",
        banner: "",
        rating: "",
        category: "NOW SHOWING",
        hasBookNow: false,
        releaseDate: "",
        genre: "",
        languages: "",
        duration: "",
        ticketPrice: 0,
    })

    const [loading, setLoading] = useState(isEditMode)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        if (isEditMode) {
            fetchMovieData()
        }
    }, [id])

    const fetchMovieData = async () => {
        try {
            setLoading(true)
            const result = await getMovieById(id!)
            if (result.success) {
                const movie = result.data
                setFormData({
                    title: movie.title,
                    image: movie.image,
                    banner: movie.banner,
                    rating: movie.rating,
                    category: movie.category,
                    hasBookNow: movie.hasBookNow,
                    releaseDate: movie.releaseDate,
                    genre: movie.genre,
                    languages: Array.isArray(movie.languages) ? movie.languages.join(", ") : movie.languages,
                    duration: movie.duration,
                    ticketPrice: movie.ticketPrice || 0,
                })
            } else {
                setError(result.message || "Failed to fetch movie data")
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target

        if (type === "checkbox") {
            const checkbox = e.target as HTMLInputElement
            setFormData({
                ...formData,
                [name]: checkbox.checked,
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        try {
            const movieData = {
                ...formData,
                languages: formData.languages.split(",").map((lang) => lang.trim()),
                ticketPrice: Number(formData.ticketPrice),
            }

            if (isEditMode) {
                // Update existing movie
                const result = await updateMovie(id!, movieData)
                if (result.success) {
                    setSuccess("Movie updated successfully")
                    setTimeout(() => navigate("/admin/movies"), 1500)
                } else {
                    setError(result.message || "Failed to update movie")
                }
            } else {
                // Add new movie
                const response = await fetch(apiRoutes.movies.addMovie, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(movieData),
                })

                const result = await response.json()

                if (result.success) {
                    setSuccess("Movie added successfully")
                    setTimeout(() => navigate("/admin/movies"), 1500)
                } else {
                    setError(result.message || "Failed to add movie")
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
                <span>Loading movie data...</span>
            </div>
        )
    }

    return (
        <div className="admin-form-container">
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            {success && <div className="admin-alert admin-alert-success">{success}</div>}

            <div className="admin-card">
                <div className="admin-card-header">
                    <button className="admin-button admin-button-secondary" onClick={() => navigate("/admin/movies")}>
                        <ArrowLeft size={16} />
                        <span>Back to Movies</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="admin-form-grid">
                        <div className="admin-form-group">
                            <label className="admin-form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="admin-form-input"
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="admin-form-select"
                                required
                            >
                                <option value="NOW SHOWING">Now Showing</option>
                                <option value="COMING SOON">Coming Soon</option>
                                <option value="BOOK EARLY">Book Early</option>
                            </select>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Poster Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="admin-form-input"
                                required
                            />
                            {formData.image && (
                                <div className="admin-form-preview">
                                    <img
                                        src={formData.image || "/placeholder.svg"}
                                        alt="Poster Preview"
                                        className="admin-image-preview"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Banner Image URL</label>
                            <input
                                type="text"
                                name="banner"
                                value={formData.banner}
                                onChange={handleChange}
                                className="admin-form-input"
                                required
                            />
                            {formData.banner && (
                                <div className="admin-form-preview">
                                    <img
                                        src={formData.banner || "/placeholder.svg"}
                                        alt="Banner Preview"
                                        className="admin-banner-preview"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Rating</label>
                            <input
                                type="text"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="admin-form-input"
                                placeholder="e.g. PG-13"
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Genre</label>
                            <input
                                type="text"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                className="admin-form-input"
                                placeholder="e.g. Action, Adventure"
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Languages (comma separated)</label>
                            <input
                                type="text"
                                name="languages"
                                value={formData.languages}
                                onChange={handleChange}
                                className="admin-form-input"
                                placeholder="e.g. English, Spanish"
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="admin-form-input"
                                placeholder="e.g. 2h 30m"
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Release Date</label>
                            <input
                                type="date"
                                name="releaseDate"
                                value={formData.releaseDate}
                                onChange={handleChange}
                                className="admin-form-input"
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Ticket Price</label>
                            <input
                                type="number"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                onChange={handleChange}
                                className="admin-form-input"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="admin-form-group admin-form-checkbox">
                            <label className="admin-checkbox-label">
                                <input type="checkbox" name="hasBookNow" checked={formData.hasBookNow} onChange={handleChange} />
                                <span>Enable "Book Now" button</span>
                            </label>
                        </div>
                    </div>

                    <div className="admin-form-actions">
                        <button
                            type="button"
                            className="admin-button admin-button-secondary"
                            onClick={() => navigate("/admin/movies")}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="admin-button admin-button-primary">
                            <Save size={16} />
                            <span>{isEditMode ? "Update Movie" : "Add Movie"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminMovieForm
