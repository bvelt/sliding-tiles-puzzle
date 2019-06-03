import States from './States';
import { defaultSettings } from './Settings';
import Successor from './Successor';

export default class Shuffle {
  constructor(settings = defaultSettings) {
    this.settings = settings;
    this.successor = new Successor(settings);
  }
  randomIndex(length) {
    return Math.floor(Math.random() * length);
  }
  shuffle(tiles, times) {
    const closed = new States();
    let next = tiles;
    for (let i = 0; i < times; i++) {
      const succ = this.successor.successors(next);
      while (succ.length > 0) {
        const randomIndex = this.randomIndex(succ.length);
        next = succ[randomIndex][1];
        if (closed.put(next)) {
          break;
        }
        succ.splice(randomIndex, 1);
      }
    }
    return next;
  }
}