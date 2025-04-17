import apiRoutes from "../config/apiRoutes";

export const getScreeningWithSeats = async (screeningId: string) => {
    try {
        const res = await fetch(`${apiRoutes.screenings.getDetails(screeningId)}`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to fetch screening data");
        }

        return {
            success: true,
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};
