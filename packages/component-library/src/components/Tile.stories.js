import React from 'react';
import { storiesOf } from '@storybook/react';

import '../index.scss';

import Tile from './Tile';

export const createTile = () => ({
    title: 'This is the title',
    description: 'This is the description for this tile',
    src: `https://picsum.photos/1200/580?random=${Math.random()}`,
    href: `https://example.com`
});

export const tileWithLongDescription = {
    ...createTile(),
    description: `This is the description for this tile with a very long description. Is it enough? I don't think so, lorem ipsum.`,
};

storiesOf('Tile', module)
    .addDecorator(storyFn => <div style={{ width: '50%' }}>{storyFn()}</div>)
    .add('default', () => <Tile {...createTile()} />)
    .add('with long description', () => <Tile {...tileWithLongDescription} />)
;
