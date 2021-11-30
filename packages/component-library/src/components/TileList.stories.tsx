import React, { ReactNode } from 'react'
import { Meta } from '@storybook/react/types-6-0'
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
} as Meta

export const basic = () => <TileList tiles={tilesWithLink} />

export const withHero = () => <TileList tiles={tilesWithLink} hero />
