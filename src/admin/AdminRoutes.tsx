import type React from "react"
import { Routes, Route } from "react-router-dom"
import AdminLayout from "./AdminLayout"
import Dashboard from "./pages/Dashboard"
import Movies from "./pages/Movies"
import MovieForm from "./pages/MovieForm"
import Cinemas from "./pages/Cinemas"
import CinemaForm from "./pages/CinemaForm"
import Rooms from "./pages/Rooms"
import RoomForm from "./pages/RoomForm"
import Screenings from "./pages/Screenings"
import ScreeningForm from "./pages/ScreeningForm"

const AdminRoutes: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AdminLayout>
                        <Dashboard />
                    </AdminLayout>
                }
            />
            <Route
                path="/movies"
                element={
                    <AdminLayout>
                        <Movies />
                    </AdminLayout>
                }
            />
            <Route
                path="/movies/add"
                element={
                    <AdminLayout>
                        <MovieForm />
                    </AdminLayout>
                }
            />
            <Route
                path="/movies/edit/:id"
                element={
                    <AdminLayout>
                        <MovieForm />
                    </AdminLayout>
                }
            />
            <Route
                path="/cinemas"
                element={
                    <AdminLayout>
                        <Cinemas />
                    </AdminLayout>
                }
            />
            <Route
                path="/cinemas/add"
                element={
                    <AdminLayout>
                        <CinemaForm />
                    </AdminLayout>
                }
            />
            <Route
                path="/cinemas/edit/:id"
                element={
                    <AdminLayout>
                        <CinemaForm />
                    </AdminLayout>
                }
            />
            <Route
                path="/rooms/:cinemaId"
                element={
                    <AdminLayout>
                        <Rooms />
                    </AdminLayout>
                }
            />
            <Route
                path="/rooms/add"
                element={
                    <AdminLayout>
                        <RoomForm />
                    </AdminLayout>
                }
            />
            <Route
                path="/rooms/edit/:id"
                element={
                    <AdminLayout>
                        <RoomForm />
                    </AdminLayout>
                }
            />
            <Route
                path="/screenings"
                element={
                    <AdminLayout>
                        <Screenings />
                    </AdminLayout>
                }
            />
            <Route
                path="/screenings/add"
                element={
                    <AdminLayout>
                        <ScreeningForm />
                    </AdminLayout>
                }
            />
            <Route
                path="/screenings/edit/:id"
                element={
                    <AdminLayout>
                        <ScreeningForm />
                    </AdminLayout>
                }
            />
        </Routes>
    )
}

export default AdminRoutes
