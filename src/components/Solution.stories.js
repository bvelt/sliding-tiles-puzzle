import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import Solution from './Solution';
import { Settings } from '../logic/Settings';
import Problem from '../logic/Problem';
import Shuffle from '../logic/Shuffle';
import { Search } from '../logic/Search';
import '../index.css';

const settings = new Settings(3);
const shuffle = new Shuffle(settings);

const problem = new Problem(settings);
problem.initialState = shuffle.shuffle(problem.createTiles(), 15).state;

const search = new Search(problem);
const solved = search.search();

storiesOf('Solution', module)
  .addDecorator(withKnobs)
  .add('with random', () => {
    return (
      <Solution
        settings={settings}
        solved={solved}
        solution={search.solution}
        stats={search.strategy.stats}>
      </Solution>);
  });   