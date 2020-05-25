import React, { ReactNode } from 'react'
import { withKnobs, number, text, optionsKnob as options } from '@storybook/addon-knobs'
import { StoryFn } from '@storybook/addons'

import GlobalStyle from './GlobalStyle'
import Header from './Header'

import tiles from '../mocks/tiles'

const [firstTile] = tiles

const valuesObj = tiles.reduce(
    (acc, tile) => ({
        ...acc,
        [tile.title]: tile.src,
    }),
    { empty: '' }
)

export default {
    title: 'Header',
    excludeStories: /get.*$/,
    decorators: [
        withKnobs,
        (storyFn: StoryFn) => (
            <GlobalStyle>
                {storyFn() as ReactNode}
                <img src={options('', valuesObj, firstTile.src, { display: 'select' })} alt="Hero" />
            </GlobalStyle>
        ),
    ],
}

export const Solid = () => (
    <Header
        title={<a href="/">{text('title', 'Website Title')}</a>}
        gradientStart={number('gradientStart', 200)}
        gradientEnd={number('gradientEnd', 180)}
    />
)

export const Transparent = () => (
    <Header
        title={<a href="/">{text('title', 'Website Title')}</a>}
        gradientStart={number('gradientStart', 200)}
        gradientEnd={number('gradientEnd', 180)}
        forceSolid={false}
    />
)
