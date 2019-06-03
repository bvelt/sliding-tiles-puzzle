export default class States {
  constructor(states = []) {
    this.states = states;
  }
  put(state) {
    if (this.contains(state)) {
      return false;
    }
    this.states.push(state);
    return true;
  }
  contains(state) {
    for (let existing of this.states) {
      let match = true;
      for (let i = 0; i < state.length && match; i++) {
        match = state[i] === existing[i];
      }
      if (match) {
        return true;
      }
    }
    return false;
  }
}