import States from './States';

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
  init(state) {
    this.nodes = [{
      state: state,
      depth: 0,
      pathCost: 0
    }];
    this.stats = new Stats();
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

  expand(problem, node) {
    this.stats.incrementExpansionCount();
    for (let [action, state] of problem.successor.successors(node.state)) {
      this.stats.incrementNodeCount();
      this.nodes.push({
        state: state,
        parent: node,
        action: action,
        pathCost: node.pathCost + 1,
        depth: node.depth + 1
      });
    }
  }
}

export class DepthLimited {
  constructor(maxDepth = 5) {
    this.maxDepth = maxDepth;
  }

  init(state) {
    this.nodes = [{
      state: state,
      depth: 0,
      pathCost: 0
    }];
    this.stats = new Stats();
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

  expand(problem, node) {
    if (node.depth < this.maxDepth) {
      this.stats.incrementExpansionCount();
      for (let [action, state] of problem.successor.successors(node.state)) {
        this.stats.incrementNodeCount();
        this.nodes.unshift({
          state: state,
          parent: node,
          action: action,
          pathCost: node.pathCost + 1,
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

  init(state) {
    this.root = {
      state: state,
      depth: 0,
      pathCost: 0
    };
    this.nodes = [this.root];
    this.depth = 0;
    this.closed = new States();
    this.stats = new Stats();
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

  expand(problem, node) {
    if (node.depth < this.depth) {
      this.stats.incrementExpansionCount();
      for (let [action, state] of problem.successor.successors(node.state)) {
        if (this.closed.put(state)) {
          this.stats.incrementNodeCount();
          this.nodes.unshift({
            state: state,
            parent: node,
            action: action,
            pathCost: node.pathCost + 1,
            depth: node.depth + 1
          });
        }
      }
    }
  }
}

export class Search {
  constructor(problem, strategy = new IterativeDeepening()) {
    this.problem = problem;
    this.strategy = strategy;
    this.solution = null;
  }
  search() {
    this.strategy.init(this.problem.initialState);
    while (this.strategy.hasNext()) {
      const node = this.strategy.next();
      if (this.problem.goalTest(node.state)) {
        this.solution = node;
        return true;
      }
      this.strategy.expand(this.problem, node);
    }
    return false;
  }
}