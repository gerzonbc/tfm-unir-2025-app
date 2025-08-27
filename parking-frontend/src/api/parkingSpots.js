// const API_URL = "http://192.168.1.11:8383/api/parkings"; // Ajusta al endpoint real

// export async function fetchParkingsSpots() {
//     try {
//         const response = await fetch(API_URL);
//         if (!response.ok) throw new Error("Error en la petición");
//         return await response.json();
//     } catch (error) {
//         console.error("Error al obtener parkings:", error);
//         return [];
//     }
// }

export async function fetchParkingsSpots() {
    const fakeData = [
        { id: 2, state: "occupied", type: "parking-slot" },
        { id: 3, state: "occupied", type: "parking-slot" },
        { id: 34, state: "occupied", type: "disabled" },
        { id: 74, state: "available", type: "parking-slot" },
        { id: 76, state: "available", type: "parking-slot" },
        { id: 78, state: "occupied", type: "parking-slot" }
    ];

    const blob = new Blob([JSON.stringify(fakeData, null, 2)], {
        type: "application/json",
    });

    const fakeResponse = new Response(blob, {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

    try {
        const data = await fakeResponse.json();
        return data;
    } catch (error) {
        console.error("Error al obtener parkings:", error);
        return [];
    }
}
