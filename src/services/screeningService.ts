import apiRoutes from "../config/apiRoutes";

export const getScreeningWithSeats = async (screeningId: string) => {
    try {
        const res = await fetch(apiRoutes.screenings.getDetails(screeningId));
        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message || "Failed to fetch screening data");
        }

        return {
            success: true,
            data: json.data,
            message: json.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Unknown error",
        };
    }
};

export const getScreeningsByRoom = async (roomId: string) => {
    try {
        const res = await fetch(apiRoutes.screenings.getByRoom(roomId));
        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message || "Failed to fetch screenings");
        }

        return {
            success: true,
            data: json.data,
            message: json.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Unknown error",
        };
    }
};

export const addScreening = async (screeningData: {
    movieId: string;
    roomId: string;
    startTime: string;
}) => {
    try {
        const res = await fetch(apiRoutes.screenings.add, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(screeningData),
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message || "Failed to add screening");
        }

        return {
            success: true,
            message: json.message,
            data: json.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Unknown error",
        };
    }
};

export const deleteScreening = async (screeningId: string) => {
    try {
        const res = await fetch(apiRoutes.screenings.delete(screeningId), {
            method: "DELETE",
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message || "Failed to delete screening");
        }

        return {
            success: true,
            message: json.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Unknown error",
        };
    }
};
