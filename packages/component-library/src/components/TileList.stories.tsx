import React from 'react'

import TileList from './TileList'
import { Props as TileProps } from './Tile'

import tiles from '../mocks/tiles'

const tilesWithLink: TileProps[] = tiles.map(
    (tile): TileProps => ({
        ...tile,
        Wrapper: ({ children }) => <a href={tile.link}>{children}</a>,
    })
)

export default {
    title: 'TileList',
}

export const basic = () => <TileList tiles={tilesWithLink} />
