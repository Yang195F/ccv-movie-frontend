"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { getCinemaById } from "../../services/cinemaService"
import apiRoutes from "../../config/apiRoutes"
import "../styles/admin-forms.css"

interface CinemaFormData {
    cinemaName: string
}

const AdminCinemaForm: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const isEditMode = !!id

    const [formData, setFormData] = useState<CinemaFormData>({
        cinemaName: "",
    })

    const [loading, setLoading] = useState(isEditMode)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        if (isEditMode) {
            fetchCinemaData()
        }
    }, [id])

    const fetchCinemaData = async () => {
        try {
            setLoading(true)
            const result = await getCinemaById(id!)
            if (result.success) {
                const cinema = result.data
                setFormData({
                    cinemaName: cinema.name,
                })
            } else {
                setError(result.message || "Failed to fetch cinema data")
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                // Update existing cinema
                const response = await fetch(apiRoutes.cinemas.update(id!), {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })

                const result = await response.json()

                if (result.success) {
                    setSuccess("Cinema updated successfully")
                    setTimeout(() => navigate("/admin/cinemas"), 1500)
                } else {
                    setError(result.message || "Failed to update cinema")
                }
            } else {
                // Add new cinema
                const response = await fetch(apiRoutes.cinemas.add, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })

                const result = await response.json()

                if (result.success) {
                    setSuccess("Cinema added successfully")
                    setTimeout(() => navigate("/admin/cinemas"), 1500)
                } else {
                    setError(result.message || "Failed to add cinema")
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
                <span>Loading cinema data...</span>
            </div>
        )
    }

    return (
        <div className="admin-form-container">
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            {success && <div className="admin-alert admin-alert-success">{success}</div>}

            <div className="admin-card">
                <div className="admin-card-header">
                    <button className="admin-button admin-button-secondary" onClick={() => navigate("/admin/cinemas")}>
                        <ArrowLeft size={16} />
                        <span>Back to Cinemas</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="admin-form-group">
                        <label className="admin-form-label">Cinema Name</label>
                        <input
                            type="text"
                            name="cinemaName"
                            value={formData.cinemaName}
                            onChange={handleChange}
                            className="admin-form-input"
                            required
                        />
                    </div>

                    <div className="admin-form-actions">
                        <button
                            type="button"
                            className="admin-button admin-button-secondary"
                            onClick={() => navigate("/admin/cinemas")}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="admin-button admin-button-primary">
                            <Save size={16} />
                            <span>{isEditMode ? "Update Cinema" : "Add Cinema"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminCinemaForm
