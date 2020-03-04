import React, { ReactNode } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { StoryFn } from '@storybook/addons';

import Header from './Header';

export default {
    title: 'Header',
    excludeStories: /get.*$/,
    decorators: [
        withKnobs,
        (storyFn: StoryFn) => (
            <div style={{ height: '200vh' }}>{ (storyFn() as ReactNode) }</div>
        )
    ]
}

export const Solid = () => (
    <Header
        gradientStart={number('gradientStart', 200)}
        gradientEnd={number('gradientEnd', 180)}
        />
)

export const Transparent = () => (
    <Header
        gradientStart={number('gradientStart', 200)}
        gradientEnd={number('gradientEnd', 180)}
        forceSolid={false}
        />
)
