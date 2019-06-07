import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action, configureActions } from '@storybook/addon-actions';
import TileGridPreview from './TileGridPreview';
import { Settings } from '../logic/Settings';
import Problem from '../logic/Problem';
import '../index.css';

const settings = new Settings(3);
const problem = new Problem(settings);

storiesOf('TileGridPreview', module)
  .addDecorator(withKnobs)
  .add('no moves', () => {
    return (<TileGridPreview
      settings={settings}
      tiles={problem.createTiles()}>
    </TileGridPreview>);
  })
  .add('with moves', () => {
    const fromIndex = number('FromIndex', 7);
    return (<TileGridPreview
      settings={settings}
      tiles={problem.createTiles()}
      fromIndex={fromIndex}>
    </TileGridPreview>);
  });   