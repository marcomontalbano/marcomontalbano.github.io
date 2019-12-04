import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import '../storybook.scss';

import Tile from './Tile';

export const createTile = (index = 1, seed = 'picsum') => ({
    id: `this-is-the-title-${index}`,
    title: `This is the title ${index}`,
    description: `This is the description for this tile ${index}`,
    src: `https://picsum.photos/seed/${seed}/1200/580`,
    link: new URL(`https://example.com`)
});

export const tileWithLongDescription = {
    ...createTile(1, 'tileWithLongDescription'),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non posuere justo, a imperdiet leo. Etiam non ipsum a felis lobortis convallis sit amet id odio. Aliquam interdum posuere enim. Donec sollicitudin interdum sodales. Pellentesque eget nibh ac massa tristique eleifend in vitae lorem. Donec semper lectus et fermentum vehicula. Ut elementum fermentum nulla. Ut eget cursus nisi. Aliquam nec faucibus dolor. Pellentesque felis velit, volutpat eget egestas nec, ultricies eget magna. Proin iaculis consequat ante.`,
};

storiesOf('Tile', module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <div style={{ width: '50%' }}>{storyFn()}</div>)
    .add('default', () => <Tile {...object('tile', createTile())} />)
    .add('with long description', () => <Tile {...object('tile', tileWithLongDescription)} />)
;
