import { apiClient } from "../config/apiClient";
import apiRoutes from "../config/apiRoutes"

export const register = async (username: string, password: string, email: string) => {
    try {
        const response = await fetch(apiRoutes.auths.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Registration failed",
            }
        }

        return {
            success: true,
            message: data.message,
            data: {
                userId: data.userId,
            },
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        }
    }
}

export const verifyEmail = async (userId: string, code: string) => {
    try {
        const response = await fetch(apiRoutes.auths.verifyEmail, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, code }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Verification failed",
            }
        }

        return { success: true, message: data.message }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "An unknown error occurred",
        }
    }
}

export const refreshToken = async () => {
    try {
        const response = await apiClient(apiRoutes.auths.refresh, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                RefreshToken: sessionStorage.getItem("refreshToken"),
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Token refresh failed",
            }
        }

        return { success: true, data }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "An unknown error occurred",
        }
    }
}

interface LoginResponse {
    success: boolean
    message?: string
    data?: {
        token: string
        refreshToken: string
        user: {
            userId: string
            name: string
            email: string
        }
    }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(apiRoutes.auths.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Email: email,
                Password: password,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Login failed. Please check your credentials.",
            }
        }

        return {
            success: true,
            data: {
                token: data.token,
                refreshToken: data.refreshToken,
                user: data.user,
            },
        }
    } catch (error: any) {
        console.error("Login error:", error)
        return {
            success: false,
            message: error.message || "An unknown error occurred",
        }
    }
}

export const sendResetCode = async (email: string) => {
    const res = await fetch(apiRoutes.auths.forgotPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    })
    return await res.json()
}

export const verifyResetCode = async (email: string, code: string) => {
    const res = await fetch(apiRoutes.auths.verifyResetCode, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
    })
    return await res.json()
}

export const resetPassword = async (email: string, newPassword: string) => {
    const res = await fetch(apiRoutes.auths.resetPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
    })
    return await res.json()
}


export const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
}

export const isAuthenticated = (): boolean => {
    return localStorage.getItem("authToken") !== null
}

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user")
    if (!userStr) return null

    try {
        return JSON.parse(userStr)
    } catch (e) {
        return null
    }
}