import apiRoutes from "../config/apiRoutes";

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
            message: "Cinemas fetched successfully",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const getCinemaById = async (cinemaId: string) => {
    try {
        const response = await fetch(apiRoutes.cinemas.getById(cinemaId));
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Cinema not found",
            };
        }

        return {
            success: true,
            message: "Cinema details fetched",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const addCinema = async (cinemaName: string) => {
    try {
        const response = await fetch(apiRoutes.cinemas.add, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cinemaName }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to add cinema",
            };
        }

        return {
            success: true,
            message: data.message || "Cinema added successfully",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const deleteCinema = async (cinemaId: string) => {
    try {
        const response = await fetch(apiRoutes.cinemas.delete(cinemaId), {
            method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to delete cinema",
            };
        }

        return {
            success: true,
            message: data.message || "Cinema deleted",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const getRoomsByCinema = async (cinemaId: string) => {
    try {
        const response = await fetch(apiRoutes.cinemas.getRoomsByCinema(cinemaId));
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch rooms",
            };
        }

        return {
            success: true,
            message: "Rooms fetched",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const getRoomDetails = async (roomId: string) => {
    try {
        const response = await fetch(apiRoutes.cinemas.getRoom(roomId));
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Room not found",
            };
        }

        return {
            success: true,
            message: "Room fetched",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const addRoom = async (roomData: {
    cinemaName: string;
    roomName: string;
    layoutType: string;
}) => {
    try {
        const response = await fetch(apiRoutes.cinemas.addRoom, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(roomData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to add room",
            };
        }

        return {
            success: true,
            message: data.message || "Room added",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const updateRoom = async (
    roomId: string,
    data: { newName: string; layoutType: string }
) => {
    try {
        const response = await fetch(apiRoutes.cinemas.updateRoom(roomId), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || "Failed to update room",
            };
        }

        return {
            success: true,
            message: result.message || "Room updated",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const deleteRoom = async (roomId: string) => {
    try {
        const response = await fetch(apiRoutes.cinemas.deleteRoom(roomId), {
            method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to delete room",
            };
        }

        return {
            success: true,
            message: data.message || "Room deleted",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};
