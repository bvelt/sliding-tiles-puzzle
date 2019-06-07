import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action, configureActions } from '@storybook/addon-actions';
import ActionSequence from './ActionSequence';
import { Settings } from '../logic/Settings';
import Problem from '../logic/Problem';
import Shuffle from '../logic/Shuffle';
import '../index.css';

const settings = new Settings(3);
const problem = new Problem(settings);
const shuffle = new Shuffle(settings);
let node = shuffle.shuffle(problem.createTiles(), 25);
const actions = [];
while (node.action) {
  actions.unshift([node.action, node.state]);
  node = node.parent;
}

storiesOf('ActionSequence', module)
  .addDecorator(withKnobs)
  .add('with random', () => {
    return (<ActionSequence settings={settings} actions={actions}></ActionSequence>);
  });   