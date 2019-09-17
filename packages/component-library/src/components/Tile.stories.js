import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import '../index.scss';

import Tile from './Tile';

export const createTile = () => ({
    title: 'This is the title',
    description: 'This is the description for this tile',
    src: `https://picsum.photos/seed/picsum/1200/580`,
    href: `https://example.com`
});

export const tileWithLongDescription = {
    ...createTile(),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non posuere justo, a imperdiet leo. Etiam non ipsum a felis lobortis convallis sit amet id odio. Aliquam interdum posuere enim. Donec sollicitudin interdum sodales. Pellentesque eget nibh ac massa tristique eleifend in vitae lorem. Donec semper lectus et fermentum vehicula. Ut elementum fermentum nulla. Ut eget cursus nisi. Aliquam nec faucibus dolor. Pellentesque felis velit, volutpat eget egestas nec, ultricies eget magna. Proin iaculis consequat ante.`,
};

storiesOf('Tile', module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <div style={{ width: '50%' }}>{storyFn()}</div>)
    .add('default', () => <Tile {...object('tile', { ...createTile() })} />)
    .add('with long description', () => <Tile {...tileWithLongDescription} />)
;
