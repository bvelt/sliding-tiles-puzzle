
export function stateEquals(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (!(a[i] === b[i])) {
      return false;
    }
  }
  return true;
}

export default class States {
  constructor(states = []) {
    this.states = states;
  }

  addLast(state) {
    this.states.push(state);
    return true;
  }

  addLastIfAbsent(state) {
    if (this.contains(state)) {
      return false;
    }
    this.states.push(state);
    return true;
  }

  addFirst(state) {
    this.states.unshift(state);
    return true;
  }

  addFirstIfAbsent(state) {
    if (this.contains(state)) {
      return false;
    }
    this.states.unshift(state);
    return true;
  }

  removeFirst() {
    if (this.isEmpty()) {
      throw new Error("No states remaining");
    }
    return this.states.shift();
  }

  isEmpty() {
    return this.states.length === 0;
  }

  size() {
    return this.states.length;
  }

  findIndex(state) {
    return this.states.findIndex(existing => stateEquals(state, existing));
  }

  contains(state) {
    return this.states.some(existing => stateEquals(state, existing));
  }
}