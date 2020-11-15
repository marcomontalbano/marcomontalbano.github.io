import React, { ReactNode } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { withKnobs, text } from '@storybook/addon-knobs'
import { StoryFn } from '@storybook/addons'

import GlobalStyle from './GlobalStyle'
import Tile from './Tile'

import tiles from '../mocks/tiles'

const [tile] = tiles

export default {
    title: 'Tile',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
        (storyFn: StoryFn) => <GlobalStyle style={{ width: '50%' }}>{storyFn() as ReactNode}</GlobalStyle>,
    ],
} as Meta

export const Basic = () => (
    <Tile
        id={tile.id}
        title={text('title', tile.title)}
        description={text('description', tile.description)}
        src={text('src', tile.src)}
    />
)

export const WithLongDescription = () => (
    <Tile
        id={tile.id}
        title={text('title', tile.title)}
        description={text(
            'description',
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non posuere justo, a imperdiet leo. Etiam non ipsum a felis lobortis convallis sit amet id odio. Aliquam interdum posuere enim. Donec sollicitudin interdum sodales. Pellentesque eget nibh ac massa tristique eleifend in vitae lorem. Donec semper lectus et fermentum vehicula. Ut elementum fermentum nulla. Ut eget cursus nisi. Aliquam nec faucibus dolor. Pellentesque felis velit, volutpat eget egestas nec, ultricies eget magna. Proin iaculis consequat ante.`
        )}
        src={text('src', tile.src)}
    />
)

export const WithLink = () => (
    <Tile
        id={tile.id}
        title={text('title', tile.title)}
        description={text('description', tile.description)}
        src={text('src', tile.src)}
        Wrapper={({ children }) => <a href={tile.link}>{children}</a>}
    />
)
