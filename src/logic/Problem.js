import { defaultSettings } from './Settings';
import Successor from './Successor';

export default class Problem {
  constructor(settings = defaultSettings) {
    this.settings = settings;
    this.successor = new Successor(settings);
    this.goalState = this.createTiles();
    this.initialState = this.createTiles();
  }

  createTiles() {
    const tiles = [];
    for (let i = 0; i < (this.settings.rowCount * this.settings.columnCount); i++) {
      tiles.push(i + 1);
    }
    return tiles;
  }

  goalTest(tiles) {
    for (let i = 0; i < this.goalState.length; i++) {
      if (tiles[i] !== this.goalState[i]) {
        return false;
      }
    }
    return true;
  }
}