import React from 'react';

import './TileList.scss';

import { Props as TileProps, default as Tile } from './Tile';

type Props = {
    tiles: Array<TileProps>
}

const TileList = ({ tiles }: Props) => (
    <div className="tile-list">
        {tiles.map(tile => (
            <Tile key={tile.id} { ...tile } />
        ))}
    </div>
);

export default TileList;
