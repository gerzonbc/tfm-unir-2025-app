import React, { useEffect, useState, useMemo } from 'react';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import { fetchParkingSummary } from '../../api/parkingService';


function severityFromFloorSummary(summary) {
    if (!summary?.totalSlots) {
        return 'secondary';
    }
    const ratio = summary.occupiedSlots / summary.totalSlots;
    if (ratio < 0.4) return 'success';
    if (ratio < 0.75) return 'warning';
    return 'danger';
}

export default function ParkingSummary({ parking, onOpenModal }) {
    const parkingId = parking?.id;
    const [state, setState] = useState({ data: null, loading: false, error: null });

    useEffect(() => {
        let cancelled = false;
        async function load() {
            if (!parkingId) return;
            setState({ data: null, loading: true, error: null });
            try {
                const data = await fetchParkingSummary(parkingId);
                if (!cancelled) setState({ data, loading: false, error: null });
            } catch (err) {
                if (!cancelled) setState({ data: null, loading: false, error: err?.message || 'Error' });
            }
        }
        load();
        return () => { cancelled = true; };
    }, [parkingId]);

    const overall = state.data?.overall;
    const floors = useMemo(() => {
        const list = state.data?.floors || [];
        return list.slice().sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
    }, [state.data]);

    return (
        <>
            <Divider />
            {state.loading && <p>Loading slots…</p>}
            {state.error && <p style={{ color: 'crimson' }}>Error: {state.error}</p>}
            {!state.loading && !state.error && (
                <>
                    <p><strong>Plazas Totales:</strong> {overall?.totalSlots ?? '—'}</p>
                    <p><strong>Plazas libres:</strong> {overall?.availableSlots ?? '—'}</p>
                    <p><strong>Plazas ocupadas:</strong> {overall?.occupiedSlots ?? '—'}</p>

                    <Divider />
                    <p><strong>Plantas:</strong></p>
                    <div className="flex flex-wrap md:flex-nowrap gap-2">
                        {floors.length > 0 ? (
                            floors.map((f) => (
                                <Button
                                    key={f.id}
                                    onClick={() => onOpenModal?.({ ...parking, floorId: f.id, floorNumber: f.number })}
                                    label={`P${f.number}`}
                                    icon="pi pi-car"
                                    rounded
                                    text
                                    severity={severityFromFloorSummary(f.summary)}
                                    aria-label={`P${f.number}`}
                                    tooltip={`Total: ${f.summary?.totalSlots ?? 0} · Libres: ${f.summary?.availableSlots ?? 0} · Ocupadas: ${f.summary?.occupiedSlots ?? 0}`}
                                    tooltipOptions={{ position: 'top' }}
                                />
                            ))
                        ) : (
                            <span>—</span>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

ParkingSummary.propTypes = {
    parking: PropTypes.object.isRequired,
    onOpenModal: PropTypes.func
};