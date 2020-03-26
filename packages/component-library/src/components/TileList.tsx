import React from 'react'
import styled from 'styled-components'

import { StyledComponents } from '../types'
import Tile, { Props as TileProps } from './Tile'

export type Props = {
    tiles: TileProps[]
}

const TileList = ({ className, tiles }: Props & StyledComponents) => (
    <div className={className}>
        {tiles.map((tile) => (
            <Tile key={tile.id} {...tile} />
        ))}
    </div>
)

export default styled(TileList)`
    display: flex;
    flex-wrap: wrap;
    margin: 1px;

    > ${Tile} {
        flex: 1 1 512px;
        margin: 1px;

        &:nth-child(6n + 1) {
            flex-basis: 768px;
        }
    }
`
