const BASE_URL = process.env.REACT_APP_API_PARKING_SLOTS_URL;

export async function fetchParkingsSpots(parkingId) {
    try {
        const response = await fetch(`${BASE_URL}/floors/${parkingId}/layout`);
        if (!response.ok) throw new Error("Error en la petición");
        return await response.json();
    } catch (error) {
        console.error("Error al obtener parkings:", error);
        return [];
    }
}
