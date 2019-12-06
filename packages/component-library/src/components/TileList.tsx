import React from 'react';
import styled from 'styled-components';
import StyledComponentsType from './StyledComponentsType';

import Tile, { TileProps } from './Tile';

type TileListProps = {
    tiles: TileProps[]
}

const TileList = ({ className, tiles }: TileListProps & StyledComponentsType) => (
    <div className={className}>
        {tiles.map(tile => (
            <Tile key={tile.id} { ...tile } />
        ))}
    </div>
);

export default styled(TileList)`
    display: flex;
    flex-wrap: wrap;
    margin: 1px;

    > ${Tile} {
        flex: 1 1 512px;
        margin: 1px;

        &:nth-child(6n+1) {
            flex-basis: 768px;
        }
    }
`;
