import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action, configureActions } from '@storybook/addon-actions';
import SlidingTileGrid from './SlidingTileGrid';
import '../index.css';

storiesOf('SlidingTileGrid', module)
  .addDecorator(withKnobs)
  .add('with moves', () => {
    return (<SlidingTileGrid></SlidingTileGrid>);
  });   