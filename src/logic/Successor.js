import { defaultSettings } from './Settings';
import { ActionFactory } from './Action';
import Reducer from './Reducer';

export default class Successor {
  constructor(settings = defaultSettings) {
    this.settings = settings;
    this.actionFactory = new ActionFactory();
    this.reducer = new Reducer();
  }

  actions(tiles) {
    const fromIndex = tiles.indexOf(this.settings.blankSpace);
    if (fromIndex === -1) {
      throw new Error(`Tiles is missing blank space ${tiles}`);
    }
    const fromRow = Math.floor(fromIndex / this.settings.rowCount);
    const fromCol = fromIndex % this.settings.columnCount;

    const actions = [];
    if (fromRow > 0) {
      const toIndex = fromIndex - this.settings.columnCount;
      actions.push(this.actionFactory.blankUp(fromIndex, toIndex));
    }
    if (fromCol + 1 < this.settings.columnCount) {
      const toIndex = fromIndex + 1;
      actions.push(this.actionFactory.blankRight(fromIndex, toIndex));
    }
    if (fromRow + 1 < this.settings.rowCount) {
      const toIndex = fromIndex + this.settings.columnCount;
      actions.push(this.actionFactory.blankDown(fromIndex, toIndex));
    }
    if (fromCol > 0) {
      const toIndex = fromIndex - 1;
      actions.push(this.actionFactory.blankLeft(fromIndex, toIndex));
    }

    return actions;
  }

  successors(tiles) {
    return this.actions(tiles).map(action =>
      [action, this.reducer.reduce(tiles, action)]);
  }
}
