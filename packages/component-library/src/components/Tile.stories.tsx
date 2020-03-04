import React, { ReactNode } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StoryFn } from '@storybook/addons';

import Tile from './Tile';

import tiles from '../mocks/tiles';

export default {
    title: 'Tile',
    decorators: [
        withKnobs,
        (storyFn: StoryFn) => (
            <div style={{ width: '50%' }}>{ (storyFn() as ReactNode) }</div>
        )
    ]
}

export const Basic = () => (
    <Tile
        id={ text('id', tiles[1].id) }
        title={ text('title', tiles[1].title) }
        description={ text('description', tiles[1].description) }
        src={ text('src', tiles[1].src) }
        link={ text('link', tiles[1].link) }
    />
)

export const WithLongDescription = () => (
    <Tile
        id={ text('id', tiles[1].id) }
        title={ text('title', tiles[1].title) }
        description={ text('description', `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non posuere justo, a imperdiet leo. Etiam non ipsum a felis lobortis convallis sit amet id odio. Aliquam interdum posuere enim. Donec sollicitudin interdum sodales. Pellentesque eget nibh ac massa tristique eleifend in vitae lorem. Donec semper lectus et fermentum vehicula. Ut elementum fermentum nulla. Ut eget cursus nisi. Aliquam nec faucibus dolor. Pellentesque felis velit, volutpat eget egestas nec, ultricies eget magna. Proin iaculis consequat ante.`) }
        src={ text('src', tiles[1].src) }
        link={ text('link', tiles[1].link) }
    />
)
