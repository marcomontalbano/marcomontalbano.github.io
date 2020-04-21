import React, { ReactNode } from 'react'
import { withKnobs, text, optionsKnob as options } from '@storybook/addon-knobs'
import { StoryFn } from '@storybook/addons'

import Tile from './Tile'

import tiles from '../mocks/tiles'

const [tile] = tiles

const valuesObj = tiles.reduce(
    (acc, tile) => ({
        ...acc,
        [tile.title]: JSON.stringify(tile),
    }),
    {}
)

export default {
    title: 'Tile',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
        (storyFn: StoryFn) => <div style={{ width: '50%' }}>{storyFn() as ReactNode}</div>,
    ],
}

export const Basic = () => (
    <Tile
        id={text('id', tile.id)}
        title={text('title', tile.title)}
        description={text('description', tile.description)}
        src={text('src', tile.src)}
        link={text('link', tile.link)}
    />
)

export const WithLongDescription = () => (
    <Tile
        id={text('id', tile.id)}
        title={text('title', tile.title)}
        description={text(
            'description',
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non posuere justo, a imperdiet leo. Etiam non ipsum a felis lobortis convallis sit amet id odio. Aliquam interdum posuere enim. Donec sollicitudin interdum sodales. Pellentesque eget nibh ac massa tristique eleifend in vitae lorem. Donec semper lectus et fermentum vehicula. Ut elementum fermentum nulla. Ut eget cursus nisi. Aliquam nec faucibus dolor. Pellentesque felis velit, volutpat eget egestas nec, ultricies eget magna. Proin iaculis consequat ante.`
        )}
        src={text('src', tile.src)}
        link={text('link', tile.link)}
    />
)

export const RealData = () => (
    <Tile
        {...JSON.parse(
            options('tile', valuesObj, JSON.stringify(tile), {
                display: 'radio',
            })
        )}
    />
)
