import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import RenderSpot2 from '../commons/RenderSpot2';

export default function LayoutMap({ spots }) {
    const { rows, cols } = useMemo(() => {
        const maxRow = spots?.length ? Math.max(...spots.map(s => s.row)) : 0;
        const maxCol = spots?.length ? Math.max(...spots.map(s => s.col)) : 0;
        return { rows: maxRow, cols: maxCol };
    }, [spots]);

    return <RenderSpot2 spots={spots} cols={cols} rows={rows} />;
}

