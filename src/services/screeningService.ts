import apiRoutes from "../config/apiRoutes";

export const getScreeningWithSeats = async (screeningId: string) => {
    try {
        const res = await fetch(`${apiRoutes.screenings.getDetails(screeningId)}`);
        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message || "Failed to fetch screening data");
        }

        return {
            success: json.success,
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

