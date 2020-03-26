import React, { ReactNode } from 'react'
import { withKnobs, number, text, optionsKnob as options } from '@storybook/addon-knobs'
import { StoryFn } from '@storybook/addons'

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
            <div
                style={{
                    height: '200vh',
                    backgroundImage: `url('${options('', valuesObj, firstTile.src, {
                        display: 'select',
                    })}')`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {storyFn() as ReactNode}
            </div>
        ),
    ],
}

export const Solid = () => (
    <Header
        title={text('title', 'Website Title')}
        gradientStart={number('gradientStart', 200)}
        gradientEnd={number('gradientEnd', 180)}
    />
)

export const Transparent = () => (
    <Header
        title={text('title', 'Website Title')}
        gradientStart={number('gradientStart', 200)}
        gradientEnd={number('gradientEnd', 180)}
        forceSolid={false}
    />
)
