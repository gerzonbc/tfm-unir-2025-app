// src/components/parking/ParkingMarkers.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import { getParkingIcon } from '../../utils/parkingIcon';
import ParkingSummary from './ParkingSummary';
import { fetchParkingSummary } from '../../api/parkingService';

// Helper por si a veces viene embed (p.type.name) o plano (p.typeName)
const getTypeName = (p) => p?.type?.name ?? p?.typeName ?? '—';
const refreshMs = Number(process.env.REACT_APP_REFRESHS_INTERVAL) || 10000; // por defecto, 30s


export default function ParkingMarkers({ parkings, onOpenModal }) {
    return (
        <>
            {(parkings ?? []).map((p) => (
                <ParkingMarker key={p.id} parking={p} onOpenModal={onOpenModal} />
            ))}
        </>
    );
}


function ParkingMarker({ parking, onOpenModal }) {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const data = await fetchParkingSummary(parking.id);
                if (!cancelled) {
                    setSummary(data?.overall ?? null);
                }
            } catch (err) {
                console.error('Error fetching parking summary:', err);
                if (!cancelled) {
                    setSummary(null);
                }
            }
        }
        if (parking?.id) {
            load();
        }
        // Polling ligero: refresca cada 10s (ajustable por prop)
        const t = setInterval(load, refreshMs);
        return () => { cancelled = true; clearInterval(t); };
    }, [parking?.id, refreshMs]);

    // Definir el icono dinámico según la ocupación
    const icon = useMemo(() => {
        if (!summary?.totalSlots) {
            return getParkingIcon(0, 100);
        } // sin datos
        return getParkingIcon(summary.occupiedSlots, summary.totalSlots);                      // lleno
    }, [summary]);

    return (
        <Marker position={[parking.lat, parking.lng]} icon={icon}>
            <Popup>
                <strong>{parking.name} - {getTypeName(parking)}</strong><br />
                <p>{parking.address}</p>
                <a
                    href={`https://www.google.com/maps?q=${parking.lat},${parking.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007bff', textDecoration: 'underline' }}
                >
                    Ver ubicación
                </a>

                <ParkingSummary parking={parking} onOpenModal={onOpenModal} />

            </Popup>
        </Marker >
    );
}

ParkingMarkers.propTypes = {
    parkings: PropTypes.array,
    onOpenModal: PropTypes.func
};

ParkingMarker.propTypes = {
    parking: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        address: PropTypes.string,
        type: PropTypes.shape({
            name: PropTypes.string
        }),
        typeName: PropTypes.string
    }).isRequired,
    onOpenModal: PropTypes.func
};