import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Button from './Button';

storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button>
      <span role="img" aria-label="100">💯</span>
    </Button>
  ))
;
