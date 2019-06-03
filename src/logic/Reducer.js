import { actionTypes } from './Action';

export default class Reducer {
  reduce(tiles, action) {
    switch (action.type) {
      case actionTypes.BLANK_UP:
      case actionTypes.BLANK_RIGHT:
      case actionTypes.BLANK_DOWN:
      case actionTypes.BLANK_LEFT:
        return this.moveTiles(tiles, action.fromIndex, action.toIndex);
      default:
        return tiles;
    }
  }

  moveTiles(tiles, fromIndex, toIndex) {
    const movedTiles = Array.from(tiles);
    movedTiles[toIndex] = tiles[fromIndex];
    movedTiles[fromIndex] = tiles[toIndex];
    return movedTiles;
  }
}
