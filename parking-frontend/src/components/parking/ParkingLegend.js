// src/components/ParkingLegend.jsx
import React from 'react';
import '../../styles/parkingLegend.css';

export default function ParkingLegend() {
    return (
        <div className="parking-legend">
            <div className="legend-item">
                <span className="material-icons green">emoji_transportation</span>
                <span className="legend-label">Baja ocupación</span>
            </div>
            <div className="legend-item">
                <span className="material-icons orange">emoji_transportation</span>
                <span className="legend-label">Ocupación media</span>
            </div>
            <div className="legend-item">
                <span className="material-icons red">emoji_transportation</span>
                <span className="legend-label">Alta ocupación</span>
            </div>
        </div>
    );
}
