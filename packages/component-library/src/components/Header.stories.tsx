import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import Header from './Header';

storiesOf('Header', module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <div style={{ height: '200vh' }}>{storyFn()}</div>)
    .add('solid', () => <Header
        gradientStart={number('gradientStart', 200)}
        gradientEnd={number('gradientEnd', 180)}
        />)
    .add('transparent', () => <Header
        gradientStart={number('gradientStart', 200)}
        gradientEnd={number('gradientEnd', 180)}
        forceSolid={false}
        />)
;
