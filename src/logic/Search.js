import States from './States';
import { defaultSettings } from './Settings';

export class Stats {
  constructor() {
    this.nodeCount = 0;
    this.expansionCount = 0;
  }
  incrementNodeCount() {
    this.nodeCount++;
  }
  incrementExpansionCount() {
    this.expansionCount++;
  }
  branchingFactor() {
    return (this.nodeCount / this.expansionCount).toFixed(2);
  }
}

export class BreadthFirst {
  init(problem) {
    this.problem = problem;
    this.stats = new Stats();
    this.nodes = [{
      state: problem.initialState,
      depth: 0,
      pathCost: 0
    }];
  }

  hasNext() {
    return this.nodes.length > 0;
  }

  next() {
    if (!this.hasNext()) {
      throw new Error("No candidate nodes remaining")
    }
    return this.nodes.shift();
  }

  expand(node) {
    this.stats.incrementExpansionCount();
    for (let [action, state] of this.problem.successor.successors(node.state)) {
      this.stats.incrementNodeCount();
      this.nodes.push({
        state: state,
        parent: node,
        action: action,
        pathCost: 0,
        depth: node.depth + 1
      });
    }
  }
}

export class DepthLimited {
  constructor(maxDepth = 5) {
    this.maxDepth = maxDepth;
  }

  init(problem) {
    this.problem = problem;
    this.stats = new Stats();
    this.nodes = [{
      state: problem.initialState,
      depth: 0,
      pathCost: 0
    }];
  }

  hasNext() {
    return this.nodes.length > 0;
  }

  next() {
    if (!this.hasNext()) {
      throw new Error("No candidate nodes remaining")
    }
    return this.nodes.shift();
  }

  expand(node) {
    if (node.depth < this.maxDepth) {
      this.stats.incrementExpansionCount();
      for (let [action, state] of this.problem.successor.successors(node.state)) {
        this.stats.incrementNodeCount();
        this.nodes.unshift({
          state: state,
          parent: node,
          action: action,
          pathCost: 0,
          depth: node.depth + 1
        });
      }
    }
  }
}

export class IterativeDeepening {
  constructor(maxDepth = 15) {
    this.maxDepth = maxDepth;
  }

  init(problem) {
    this.problem = problem;
    this.depth = 0;
    this.closed = new States();
    this.stats = new Stats();
    this.root = {
      state: problem.initialState,
      depth: 0,
      pathCost: 0
    };
    this.nodes = [this.root];
  }

  hasNext() {
    return this.nodes.length > 0
      || this.depth < this.maxDepth;
  }

  next() {
    if (!this.hasNext()) {
      throw new Error("No candidate nodes remaining")
    }

    if (this.nodes.length === 0 && this.depth < this.maxDepth) {
      this.nodes.push(this.root);
      this.closed = new States();
      this.depth++;
    }

    return this.nodes.shift();
  }

  expand(node) {
    if (node.depth < this.depth) {
      this.stats.incrementExpansionCount();
      for (let [action, state] of this.problem.successor.successors(node.state)) {
        if (this.closed.put(state)) {
          this.stats.incrementNodeCount();
          this.nodes.unshift({
            state: state,
            parent: node,
            action: action,
            pathCost: 0,
            depth: node.depth + 1
          });
        }
      }
    }
  }
}

export class Heuristic {
  constructor(settings = defaultSettings) {
    this.settings = settings;
  }

  cityBlockDistance(fromIndex, toIndex) {
    const positions = Math.abs(fromIndex - toIndex);
    const vertical = Math.floor(positions / this.settings.columnCount);
    const horizontal = positions % this.settings.columnCount;
    return vertical + horizontal;
  }

  estimatedPathCost(state, goal) {
    let distance = 0;
    for (let goalIndex = 0; goalIndex < goal.length; goalIndex++) {
      const stateIndex = state.indexOf(goal[goalIndex]);
      distance += this.cityBlockDistance(stateIndex, goalIndex);
    }
    return distance;
  }
}

export function pathCostComparator(a, b) {
  if (a.pathCost < b.pathCost) {
    return -1;
  }
  if (a.pathCost > b.pathCost) {
    return 1;
  }
  return 0;
}

export class GreedyBestFirst {
  init(problem) {
    this.problem = problem;
    this.heuristic = new Heuristic(problem.settings);
    this.closed = new States();
    this.stats = new Stats();
    this.nodes = [{
      state: problem.initialState,
      depth: 0,
      pathCost: this.heuristic.estimatedPathCost(problem.initialState, problem.goalState)
    }];
  }

  hasNext() {
    return this.nodes.length > 0;
  }

  next() {
    if (!this.hasNext()) {
      throw new Error("No candidate nodes remaining")
    }

    return this.nodes.shift();
  }

  createNode(parent, state, action, depth) {
    return {
      parent: parent,
      state: state,
      action: action,
      depth: depth,
      pathCost: this.heuristic.estimatedPathCost(state, this.problem.goalState)
    };
  }

  expand(node) {
    this.stats.incrementExpansionCount();
    for (let [action, state] of this.problem.successor.successors(node.state)) {
      if (this.closed.put(state)) {
        this.stats.incrementNodeCount();
        this.nodes.unshift(this.createNode(node, state, action, node.depth + 1));
      }
    }
    this.nodes.sort(pathCostComparator);
  }
}

export class AStar {
  init(problem) {
    this.problem = problem;
    this.heuristic = new Heuristic(problem.settings);
    this.closed = new States();
    this.stats = new Stats();
    this.nodes = [{
      state: problem.initialState,
      depth: 0,
      pathCost: this.heuristic.estimatedPathCost(problem.initialState, problem.goalState)
    }];
  }

  hasNext() {
    return this.nodes.length > 0;
  }

  next() {
    if (!this.hasNext()) {
      throw new Error("No candidate nodes remaining")
    }

    return this.nodes.shift();
  }

  createNode(parent, state, action, depth) {
    return {
      parent: parent,
      state: state,
      action: action,
      depth: depth,
      pathCost: depth + this.heuristic.estimatedPathCost(state, this.problem.goalState)
    };
  }

  expand(node) {
    this.stats.incrementExpansionCount();
    for (let [action, state] of this.problem.successor.successors(node.state)) {
      if (this.closed.put(state)) {
        this.stats.incrementNodeCount();
        this.nodes.push(this.createNode(node, state, action, node.depth + 1));
      }
    }
    this.nodes.sort(pathCostComparator);
  }
}

export class Search {
  constructor(problem, strategy = new AStar()) {
    this.problem = problem;
    this.strategy = strategy;
    this.solution = null;
  }
  search() {
    this.strategy.init(this.problem);
    while (this.strategy.hasNext()) {
      const node = this.strategy.next();
      if (this.problem.goalTest(node.state)) {
        this.solution = node;
        return true;
      }
      this.strategy.expand(node);
    }
    return false;
  }
}