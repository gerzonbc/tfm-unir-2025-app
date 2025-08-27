import React from 'react';
import RenderSpot from '../commons/RenderSpot';

const rows = 6;
const cols = 12;

export default function LayoutMap1({ spots }) {
    return (
        <RenderSpot spots={spots} cols={cols} rows={rows} />
    );
}
