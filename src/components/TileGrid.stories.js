import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action, configureActions } from '@storybook/addon-actions';
import TileGrid from './TileGrid';
import '../index.css';

const columnCount = 4;
const rowCount = 4;
const tileCount = columnCount * rowCount;

function tiles(blankTileIndex) {
  const tiles = [];
  for (let i = 0; i < tileCount; i++) {
    tiles.push(i + 1);
  }

  tiles[tileCount - 1] = tiles[blankTileIndex]
  tiles[blankTileIndex] = tileCount;

  return tiles;
}

storiesOf('TileGrid', module)
  .addDecorator(withKnobs)
  .add('no moves', () => {
    const blankTileIndex = number('BlankTileIndex', tileCount - 1);
    return (<TileGrid
      columnCount={columnCount}
      rowCount={rowCount}
      tiles={tiles(blankTileIndex)}
      onMove={id => action('onMove')(id)}>
    </TileGrid>);
  })
  .add('with moves', () => {
    const blankTileIndex = number('BlankTileIndex', tileCount - 1);
    const moveToIndex = number('MoveBlankToIndex', 0);
    return (<TileGrid
      columnCount={columnCount}
      rowCount={rowCount}
      tiles={tiles(blankTileIndex)}
      moves={[[{ toIndex: moveToIndex }, []]]}
      onMove={id => action('onMove')(id)}>
    </TileGrid>);
  });   