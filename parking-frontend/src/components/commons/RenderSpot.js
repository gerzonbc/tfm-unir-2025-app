import React from 'react';
import "../../styles/parkingLayout.css";

export default function RenderSpot({ spots, cols, rows }) {

    const renderSpot = (row, col) => {
        const spot = spots.find((s) => s.row === row && s.col === col);
        if (!spot || spot.type === 'drive-lane') {
            return <div id={`spot-${row}-${col}`} className="parking-slot drive-lane" key={`${row}-${col}`} />;
        }
        if (!spot || spot.type === 'empty-space') {
            return <div id={`spot-${row}-${col}`} className="parking-slot empty-space" key={`${row}-${col}`} />;
        }
        if (!spot || spot.type === 'entrance-down') {
            return <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`} ><p>↓</p></div>;
        }
        if (!spot || spot.type === 'entrance-left') {
            return <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`} ><p>←</p></div>;
        }
        if (!spot || spot.type === 'entrance-right') {
            return <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`} ><p>→</p></div>;
        }
        if (!spot || spot.type === 'exit-up') {
            return <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`} ><p>↑</p></div>;
        }
        if (!spot || spot.type === 'exit-right') {
            return <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`} ><p>→</p></div>;
        }
        if (!spot || spot.type === 'exit-left') {
            return <div id={`spot-${row}-${col}`} className="parking-slot arrow" key={`${row}-${col}`} ><p>←</p></div>;
        }
        let identifier = spot.id;
        if (spot.type === "parking-slot" && spot.state === "available") {
            return <div id={`spot-${row}-${col}`} className="parking-slot available" key={`${row}-${col}`} >{identifier}</div>;
        }
        if (spot.type === "parking-slot" && spot.state === "occupied") {
            return <div id={`spot-${row}-${col}`} className="parking-slot occupied" key={`${row}-${col}`} >{identifier}</div>;
        }

        if (spot.type === "disabled" && spot.state === "available") {
            return <div id={`spot-${row}-${col}`} className="parking-slot disabled" key={`${row}-${col}`} >♿</div>;
        }
        if (spot.type === "disabled" && spot.state === "occupied") {
            return <div id={`spot-${row}-${col}`} className="parking-slot occupied" key={`${row}-${col}`} >♿</div>;
        }
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
