import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { fetchParkings } from '../../api/parkingService';
import ParkingDetailModal from './ParkingDetailModal';
import RecenterButton from '../commons/RecenterButton';
import ParkingLegend from './ParkingLegend';
import ParkingMarkers from './ParkingMarkers';
import UserMarker from '../commons/UserMarker';
import RecenterMap from '../commons/RecenterMap';


export default function ParkingMap() {
    const [parkings, setParkings] = useState([]);
    const [position, setPosition] = useState([-0.2200, -78.5120]); // Posición inicial del mapa
    const [userPosition, setUserPosition] = useState(null); // Posición real
    const [selectedParking, setSelectedParking] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchParkings().then(data => {
            setParkings(data);
        });

        // Obtener ubicación actual del usuario y me actualiza mientras me muevo
        const watcher = navigator.geolocation.watchPosition(
            (pos) => {
                const userCoords = [pos.coords.latitude, pos.coords.longitude];
                setPosition(userCoords);
                setUserPosition(userCoords);
            },
            (err) => {
                console.warn("Error al observar la ubicación:", err);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 10000
            }
        );

        return () => navigator.geolocation.clearWatch(watcher);

    }, []);

    const openModal = (parking) => {
        setSelectedParking(parking);
        setModalVisible(true);
    };


    return (
        <>
            <MapContainer center={position}
                zoom={13}
                style={{ height: '100vh' }}
                closeOnClick={() => setModalVisible(false)}>
                <RecenterMap lat={position[0]} lng={position[1]} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <UserMarker position={userPosition} />
                <ParkingMarkers parkings={parkings} onOpenModal={openModal} />
                {userPosition && <RecenterButton userPosition={userPosition} />}
            </MapContainer >
            <ParkingDetailModal
                visible={modalVisible}
                onHide={() => setModalVisible(false)}
                parking={selectedParking}
            />
            <ParkingLegend />
        </>
    );
}
