// src/components/commons/RenderSpot.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/parkingLayout.css';

// Normaliza tipo: acepta snake_case o kebab-case
function normType(t) {
    if (!t) return '';
    const s = String(t).toLowerCase();
    // ya soporta ambos: "drive_lane" -> "drive-lane"
    return s.replace(/_/g, '-');
}

// ¿estado textual a partir de occupied?
function stateFromOccupied(occupied) {
    if (occupied === true) return 'occupied';
    if (occupied === false) return 'available';
    return ''; // null/undefined -> sin estado
}

export default function RenderSpot2({ spots, cols, rows }) {
    const renderSpot = (row, col) => {
        const spot = spots.find((s) => s.row === row && s.col === col);

        // Si no hay celda en esa posición, lo tratamos como vacío
        if (!spot) {
            return (
                <div id={`spot-${row}-${col}`} className="parking-slot empty-space" key={`${row}-${col}`} />
            );
        }

        const t = normType(spot.type);
        const state = stateFromOccupied(spot.occupied);
        const identifier = spot.slotCode || spot.slotId || `${row}-${col}`;

        // Vías y vacíos
        if (t === 'drive-lane') {
            return (
                <div id={`spot-${row}-${col}`} className="parking-slot drive-lane" key={`${row}-${col}`} />
            );
        }
        if (t === 'empty-space') {
            return (
                <div id={`spot-${row}-${col}`} className="parking-slot empty-space" key={`${row}-${col}`} />
            );
        }

        // Flechas (entradas/salidas)
        if (t === 'entrance-down') {
            return (
                <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`}>
                    <p>↓</p>
                </div>
            );
        }
        if (t === 'entrance-left') {
            return (
                <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`}>
                    <p>←</p>
                </div>
            );
        }
        if (t === 'entrance-right') {
            return (
                <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`}>
                    <p>→</p>
                </div>
            );
        }
        if (t === 'exit-up') {
            return (
                <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`}>
                    <p>↑</p>
                </div>
            );
        }
        if (t === 'exit-right') {
            return (
                <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`}>
                    <p>→</p>
                </div>
            );
        }
        if (t === 'exit-left') {
            return (
                <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`}>
                    <p>←</p>
                </div>
            );
        }

        // Plazas normales y PMR (♿) con estado por 'occupied'
        if (t === 'parking-slot') {
            const cls = state === 'occupied' ? 'occupied' : 'available';
            return (
                <div id={`spot-${row}-${col}`} className={`parking-slot ${cls}`} key={`${row}-${col}`}>
                    {identifier}
                </div>
            );
        }

        if (t === 'disabled') {
            const cls = state === 'occupied' ? 'occupied' : 'disabled';
            return (
                <div id={`spot-${row}-${col}`} className={`parking-slot ${cls}`} key={`${row}-${col}`}>
                    ♿
                </div>
            );
        }

        // Fallback: si llega un tipo desconocido, lo pintamos vacío
        return (
            <div id={`spot-${row}-${col}`} className="parking-slot empty-space" key={`${row}-${col}`} />
        );
    };

    return (
        <div className="parking-layout-container">
            <div
                className="parking-layout"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
                {Array.from({ length: rows }, (_, r) =>
                    Array.from({ length: cols }, (_, c) => renderSpot(r + 1, c + 1))
                )}
            </div>
        </div>
    );
}
RenderSpot2.propTypes = {
    spots: PropTypes.array.isRequired,
    cols: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
};