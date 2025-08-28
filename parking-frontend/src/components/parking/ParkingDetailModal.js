import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
// import { fetchParkingsSpots } from '../../api/parkingSpots'
import { parkingSpotsMap1 as initialSpots } from '../../utils/parkingSpotsMap1';
import { parkingSpotsMap2 as initialSpots2 } from '../../utils/parkingSpotsMap2';
import { parkingSpotsMap3 as initialSpots3 } from '../../utils/parkingSpotsMap3';
import LayoutMap1 from '../layoutMaps/LayoutMap1';
import LayoutMap2 from '../layoutMaps/LayoutMap2';
import LayoutMap3 from '../layoutMaps/LayoutMap3';

export default function ParkingDetailModal({ visible, onHide, parking }) {


    const [spots, setSpots] = useState(initialSpots);
    const [spots2, setSpots2] = useState(initialSpots2);
    const [spots3, setSpots3] = useState(initialSpots3);


    // useEffect(() => {
    //     fetchParkingsSpots().then((spotState) => {
    //         const updatedSpots = spots.map((spot) => {
    //             const apiSpot = spotState.find(s => s.id === spot.id);
    //             return apiSpot ? { ...spot, state: apiSpot.state } : spot;
    //         });
    //         setSpots(updatedSpots);
    //     });
    // }, [spots]);

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
            <LayoutMap3 spots={spots3} />
        </Dialog>

    );
}
