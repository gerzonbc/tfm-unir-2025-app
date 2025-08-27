// src/components/parking/ParkingMarkers.jsx
import React, { memo, useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { getParkingIcon } from '../../utils/parkingIcon';

// Helper por si a veces viene embed (p.type.name) o plano (p.typeName)
const getTypeName = (p) => p?.type?.name ?? p?.typeName ?? '—';


export default function ParkingMarkers({ parkings, onOpenModal }) {
    const icon = useMemo(() => getParkingIcon(50, 80), []);

    return (
        <>
            {parkings.map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
                    <Popup>
                        <strong>{p.name} - {getTypeName(p)}</strong><br />
                        <p>{p.address}</p>
                        <Divider />
                        <p><strong>Plazas Totales:</strong> {p.total ?? 200}</p>
                        <p><strong>Plazas libres:</strong> {p.libres ?? 83}</p>
                        <p><strong>Plazas ocupadas:</strong> {p.ocupadas ?? 117}</p>
                        <Divider />
                        <p><strong>Plantas:</strong></p>
                        <div className="flex flex-wrap md:flex-nowrap gap-2">
                            <Button onClick={() => onOpenModal(p)} label="P1" icon="pi pi-car" rounded text severity="success" aria-label="P1" />
                            <Button onClick={() => onOpenModal(p)} label="P2" icon="pi pi-car" rounded text severity="warning" aria-label="P2" />
                            <Button onClick={() => onOpenModal(p)} label="P3" icon="pi pi-car" rounded text severity="danger" aria-label="P3" />
                            <Button onClick={() => onOpenModal(p)} label="P4" icon="pi pi-car" rounded text severity="success" aria-label="P4" />
                            <Button onClick={() => onOpenModal(p)} label="P5" icon="pi pi-car" rounded text severity="success" aria-label="P5" />
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}
