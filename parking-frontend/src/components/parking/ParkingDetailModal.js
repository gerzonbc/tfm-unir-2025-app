import React, { useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';

import LayoutMap from '../layoutMaps/LayoutMap';
import { fetchParkingsSpots } from '../../api/parkingSpots';


const REFRESH_MS = Number(process.env.REACT_APP_REFRESH_INTERVAL) || 30000;

export default function ParkingDetailModal({ visible, onHide, parking }) {

    const floorId = parking?.floorId;
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function load(isFirst = false) {
            if (!floorId || !visible) return;
            if (isFirst) setLoading(true);
            try {
                const data = await fetchParkingsSpots(floorId);
                if (!cancelled) {
                    setSpots(data?.cells || []);
                    setLoading(false);
                }
            } catch (e) {
                if (!cancelled) setLoading(false);
                // opcional: mostrar toast/log
                console.error('Error fetching floor layout:', e);
            }
        }

        // solo carga/poldea si el modal está visible y hay floorId
        if (visible && floorId) {
            load(true);
            timerRef.current = setInterval(() => load(false), REFRESH_MS);
        }

        return () => {
            cancelled = true;
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [visible, floorId]);

    return (
        <Dialog
            header={`Plazas`}
            visible={visible}
            breakpoints={{ '960px': '75vw', '640px': '95vw' }}
            style={{ width: '95vw', maxWidth: '600px' }}
            onHide={onHide}
            draggable={false}
            resizable={false}
            modal
            dismissableMask
        >
            {loading ? <p>Cargando plano…</p> : <LayoutMap spots={spots} />}
        </Dialog>

    );
}
