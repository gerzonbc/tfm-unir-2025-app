import { Button } from 'primereact/button';
import { useMap } from 'react-leaflet';
import '../../styles/recenterButton.css';

export default function RecenterButton({ userPosition }) {
    const map = useMap();

    const handleClick = () => {
        if (userPosition) {
            map.setView(userPosition, 13);
        }
    };

    return (

        <div className="recenter-btn-container">

            <Button
                className="p-button-rounded p-button-text recenter-btn-icon"
                onClick={handleClick}
                aria-label="Centrar mapa"
                tooltip="Volver a mi ubicación"
                tooltipOptions={{ position: 'left' }}
            >
                <span className="material-icons">gps_fixed</span>
            </Button>

        </div>
    );
}

