// src/components/parking/ParkingMarkers.jsx
import React, { memo, useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import { getParkingIcon } from '../../utils/parkingIcon';
import ParkingSummary from './ParkingSummary';

// Helper por si a veces viene embed (p.type.name) o plano (p.typeName)
const getTypeName = (p) => p?.type?.name ?? p?.typeName ?? '—';


export default function ParkingMarkers({ parkings, onOpenModal }) {
    const icon = useMemo(() => getParkingIcon(50, 80), []);

    return (
        <>
            {(parkings ?? []).map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
                    <Popup>
                        <strong>{p.name} - {getTypeName(p)}</strong><br />
                        <p>{p.address}</p>

                        {/* Totales y botones de plantas separados en su propio componente */}
                        <ParkingSummary parking={p} onOpenModal={onOpenModal} />
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

ParkingMarkers.propTypes = {
    parkings: PropTypes.array,
    onOpenModal: PropTypes.func
};