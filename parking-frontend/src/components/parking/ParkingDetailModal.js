import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';

import LayoutMap from '../layoutMaps/LayoutMap';
import { fetchParkingsSpots } from '../../api/parkingSpots';

export default function ParkingDetailModal({ visible, onHide, parking }) {


    const [spots, setSpots] = useState([]);


    useEffect(() => {
        fetchParkingsSpots(parking?.floorId).then((spots) => {
            setSpots(spots.cells || []);
        });
    }, [parking?.floorId]);


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
            <LayoutMap spots={spots} />
        </Dialog>

    );
}
