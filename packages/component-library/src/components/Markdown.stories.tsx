import React, { ReactNode } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { withKnobs, text, optionsKnob as options } from '@storybook/addon-knobs'
import { StoryFn } from '@storybook/addons'

import GlobalStyle from './GlobalStyle'
import Markdown from './Markdown'

import tiles from '../mocks/tiles'

const [tile] = tiles

const valuesObj = tiles.reduce(
    (acc, tile) => ({
        ...acc,
        [tile.title]: tile.readme.source,
    }),
    {}
)

export default {
    title: 'Markdown',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
        (storyFn: StoryFn) => <GlobalStyle style={{ margin: '15px' }}>{storyFn() as ReactNode}</GlobalStyle>,
    ],
} as Meta

export const Basic = () => <Markdown markdown={text('markdown', tile.readme.source)} />

export const RealData = () => (
    <Markdown markdown={options('tile', valuesObj, tile.readme.source, { display: 'radio' })} />
)
