import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import '../storybook.scss';

import { createTile } from './Tile.stories';

import TileList from './TileList';

const tiles = [...Array(11)].map((value, index) => createTile(index + 1, `tile-${index}`));

storiesOf('TileList', module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <div style={{  }}>{storyFn()}</div>)
    .add('default', () => <TileList tiles={object('tiles', tiles)} />)
;
