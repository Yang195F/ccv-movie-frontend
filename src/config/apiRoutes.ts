const apiRoutes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },
  user: {
    profile: "/user/profile",
    update: "/user/update",
  },
  queue: {
    getStatus: "/queue/status",
    joinQueue: "/queue/join",
  },
  movies: {
    getAll: "/movies", // List of movies
    getDetails: (movieId: string) => `/movies/${movieId}`, // Movie details placeholder
  },
  cinemas: {
    getAll: "/cinemas", // List of cinemas
    getDetails: (cinemaId: string) => `/cinemas/${cinemaId}`, // Cinema details placeholder
    getShowtimes: (cinemaId: string) => `/cinemas/${cinemaId}/showtimes`, // Showtimes for a specific cinema
  },
};

export default apiRoutes;
