import React, { ReactNode } from 'react'
import { StoryFn } from '@storybook/addons'

import GlobalStyle from './GlobalStyle'
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
    decorators: [(storyFn: StoryFn) => <GlobalStyle>{storyFn() as ReactNode}</GlobalStyle>],
}

export const basic = () => <TileList tiles={tilesWithLink} />
