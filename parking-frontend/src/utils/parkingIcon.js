
import L from 'leaflet';

export const getParkingIcon = (ocupadas, total) => {
    const ocupacion = (ocupadas / total) * 100;

    if (ocupacion < 40) {
        return L.divIcon({
            className: '',
            html: '<div class="material-icons" style="color: #7fd47f; background-color: green;">emoji_transportation</div>'
        });
    } else if (ocupacion < 70) {
        return L.divIcon({
            className: '',
            html: '<div class="material-icons" style="color: yellow; background-color: orange;">emoji_transportation</div>'
        });
    } else {
        return L.divIcon({
            className: '',
            html: '<div class="material-icons" style="color: #5c2222; background-color: red;">emoji_transportation</div>'
        });
    }
};
