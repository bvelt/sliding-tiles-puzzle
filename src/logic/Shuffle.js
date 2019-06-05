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

  randomSuccessor() {
    const closed = new States()
    return (state) => {
      let randomSucc;
      const succ = this.successor.successors(state);
      while (succ.length > 0) {
        const randomIndex = this.randomIndex(succ.length);
        randomSucc = succ[randomIndex];
        if (closed.addLastIfAbsent(randomSucc[1])) {
          break;
        }
        succ.splice(randomIndex, 1);
      }
      return randomSucc;
    }
  }

  shuffle(tiles, times) {
    let node = { state: tiles };
    const randomSucc = this.randomSuccessor();
    for (let i = 0; i < times; i++) {
      const succ = randomSucc(node.state);
      node = {
        parent: node,
        action: succ[0],
        state: succ[1]
      };
    }
    return node;
  }
}