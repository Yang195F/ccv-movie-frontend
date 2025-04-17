import apiRoutes from "../config/apiRoutes";

export const getAllMovies = async (category?: string, bannerOnly: boolean = false, genre?: string) => {
    try {
        const params = new URLSearchParams()
        if (category) params.append("category", category)
        if (bannerOnly) params.append("bannerOnly", "true")
        if (genre) params.append("genre", genre)

        const response = await fetch(`${apiRoutes.movies.getMovie}?${params.toString()}`)
        const result = await response.json()

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to fetch movies.")
        }

        return result
    } catch (error) {
        console.error("Error fetching movies:", error)
        throw error
    }
}


export const getMovieById = async (id: string) => {
    try {
        const response = await fetch(apiRoutes.movies.getDetails(id));
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch movie details",
            };
        }

        return {
            success: true,
            message: "Movie details fetched successfully.",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};


export const getShowtimes = async (cinemaId: string, movieId: string) => {
    try {
        const response = await fetch(apiRoutes.cinemas.getShowtimes(cinemaId), {
            method: "GET",
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch showtimes",
            };
        }

        return {
            success: true,
            message: "Showtimes fetched successfully.",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};


export const getCinemas = async () => {
    try {
        const response = await fetch(apiRoutes.cinemas.getAll);
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch cinemas",
            };
        }

        return {
            success: true,
            message: "Cinemas fetched successfully.",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const getRoomById = async (roomId: string) => {
    try {
        const res = await fetch(`${apiRoutes.cinemas.getRoom(roomId)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch room");

        return { success: true, data: data.data };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};