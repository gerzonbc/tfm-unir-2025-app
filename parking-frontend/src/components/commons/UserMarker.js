// src/components/parking/UserMarker.jsx
import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function UserMarker({ position }) {
    const userIcon = useMemo(() =>
        L.divIcon({
            className: 'user-location-icon',
            html: '<div class="circle"></div>'
        }), []
    );

    if (!position) return null;

    return (
        <Marker position={position} icon={userIcon}>
            <Popup>
                Estás aquí 🚗
            </Popup>
        </Marker>
    );
}
