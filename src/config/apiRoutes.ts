const API_BASE_URL = "http://localhost:5000/api"

const apiRoutes = {
  auths: {
    login: `${API_BASE_URL}/auths/login`,
    register: `${API_BASE_URL}/auths/register`,
    logout: `${API_BASE_URL}/auths/logout`,
    refresh: `${API_BASE_URL}/auths/refresh`,
    verifyEmail: `${API_BASE_URL}/auths/verify-email`,
    forgotPassword: `${API_BASE_URL}/auths/forgot-password`,
    verifyResetCode: `${API_BASE_URL}/auths/verify-reset-code`,
    resetPassword: `${API_BASE_URL}/auths/reset-password`,
    refreshToken: `${API_BASE_URL}/auths/refresh-token`,
    getMe: `${API_BASE_URL}/auths/me`,
    updateMe: `${API_BASE_URL}/auths/me`,
    getAllUsers: `${API_BASE_URL}/auths/all`,
    deleteUser: (id: string) => `${API_BASE_URL}/auths/${id}`,
  },
  movies: {
    getMovie: `${API_BASE_URL}/movies`,
    addMovie: `${API_BASE_URL}/movies/add`,
    getDetails: (movieId: string) => `${API_BASE_URL}/movies/${movieId}`,
    updateMovie: (movieId: string) => `${API_BASE_URL}/movies/${movieId}`,
    deleteMovie: (movieId: string) => `${API_BASE_URL}/movies/${movieId}`,
    getBannerMovies: `${API_BASE_URL}/movies/banner`,
  },
  cinemas: {
    getAll: `${API_BASE_URL}/cinemas`,
    getById: (cinemaId: string) => `${API_BASE_URL}/cinemas/${cinemaId}`,
    getShowtimes: (cinemaId: string) => `${API_BASE_URL}/cinemas/${cinemaId}/showtimes`,
    getRoom: (roomId: string) => `${API_BASE_URL}/cinemas/room/${roomId}`,
    add: `${API_BASE_URL}/cinema/add-cinema`,
    update: (id: string) => `${API_BASE_URL}/cinema/${id}`,
    delete: (id: string) => `${API_BASE_URL}/cinema/${id}`,
    addRoom: `${API_BASE_URL}/cinema/room/add-room`,
    updateRoom: (roomId: string) => `${API_BASE_URL}/cinema/room/${roomId}`,
    deleteRoom: (roomId: string) => `${API_BASE_URL}/cinema/room/${roomId}`,
    getRoomsByCinema: (cinemaId: string) => `${API_BASE_URL}/cinema/cinema/room/${cinemaId}`,
  },
  screenings: {
    getDetails: (id: string) => `${API_BASE_URL}/screenings/${id}`,
    getByRoom: (roomId: string) => `${API_BASE_URL}/screenings/room/${roomId}`,
    add: `${API_BASE_URL}/screenings/add`,
    delete: (id: string) => `${API_BASE_URL}/screenings/${id}`,
  },

}

export default apiRoutes
