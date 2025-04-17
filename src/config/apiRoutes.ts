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
  },
  user: {
    profile: `${API_BASE_URL}/user/profile`,
    update: `${API_BASE_URL}/user/update`,
  },
  movies: {
    getMovie: `${API_BASE_URL}/movies`,
    addMovie: `${API_BASE_URL}/movies/add`,
    getDetails: (movieId: string) => `${API_BASE_URL}/movies/${movieId}`,
  },
  cinemas: {
    getAll: `${API_BASE_URL}/cinemas`,
    getDetails: (cinemaId: string) => `${API_BASE_URL}/cinemas/${cinemaId}`,
    getShowtimes: (cinemaId: string) => `${API_BASE_URL}/cinemas/${cinemaId}/showtimes`,
    getRoom: (roomId: string) => `${API_BASE_URL}/cinemas/room/${roomId}`
  },
  screenings: {
    getDetails: (id: string) => `${API_BASE_URL}/screenings/${id}`,
  },
  tickets: {
    book: `${API_BASE_URL}/tickets/book`,
  }

}

export default apiRoutes
