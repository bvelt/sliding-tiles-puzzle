import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action, configureActions } from '@storybook/addon-actions';
import Tile from './Tile';
import '../index.css';

storiesOf('Tile', module)
  .addDecorator(withKnobs)
  .add('blank', () => {
    return (<Tile isBlank={true}></Tile>);
  })
  .add('non clickable', () => {
    const value = number('Value', '1');
    return (<Tile value={value} isClickable={false} onClick={action('onClick')}></Tile>);
  })
  .add('clickable', () => {
    const value = number('Value', '1');
    return (<Tile value={value} isClickable={true} onClick={action('onClick')}></Tile>);
  });   
