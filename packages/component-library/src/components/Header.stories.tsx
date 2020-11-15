import React, { ReactNode } from 'react'
import { Meta } from '@storybook/react/types-6-0'
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
} as Meta

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

export const WithLink = () => (
    <Header
        title={<a href="/">{text('title', 'Website Title')}</a>}
        gradientStart={number('gradientStart', 200)}
        gradientEnd={number('gradientEnd', 180)}
    >
        <a href="https://github.com/marcomontalbano">GitHub</a>
    </Header>
)
