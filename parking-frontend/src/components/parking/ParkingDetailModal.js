import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';

import { parkingSpotsMap1 as initialSpots } from '../../utils/parkingSpotsMap1';
import { parkingSpotsMap2 as initialSpots2 } from '../../utils/parkingSpotsMap2';
import { parkingSpotsMap3 as initialSpots3 } from '../../utils/parkingSpotsMap3';
import LayoutMap from '../layoutMaps/LayoutMap';
import LayoutMap1 from '../layoutMaps/LayoutMap1';
import LayoutMap2 from '../layoutMaps/LayoutMap2';
import LayoutMap3 from '../layoutMaps/LayoutMap3';
import { fetchParkingsSpots } from '../../api/parkingSpots';

export default function ParkingDetailModal({ visible, onHide, parking }) {


    const [spots, setSpots] = useState(initialSpots);
    const [spots2, setSpots2] = useState(initialSpots2);
    const [spots3, setSpots3] = useState(initialSpots3);


    useEffect(() => {
        fetchParkingsSpots(parking?.floorId).then((spots) => {
            setSpots(spots.cells || []);
        });
    }, [spots]);

    // if (!parking) return null;


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
            {/*<LayoutMap1 spots={spots} />
            <LayoutMap2 spots={spots2} />*/}
            <LayoutMap spots={spots} />
        </Dialog>

    );
}
