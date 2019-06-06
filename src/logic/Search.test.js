import * as search from './Search';
import { Settings } from './Settings';
import Problem from './Problem';

describe('Search', () => {
  const settings = new Settings(3);
  const problem = new Problem(settings);
  describe('BreadthFirst', () => {
    const strategy = new search.BreadthFirst();
    it('should initialize from problem initial state', () => {
      strategy.init(problem);
      expect(strategy.nodes.length).toEqual(1);
      expect(strategy.nodes[0].state).toEqual(problem.initialState);
    });
    it('should iterate nodes', () => {
      strategy.init(problem);
      expect(strategy.hasNext()).toBeTruthy();
      expect(strategy.next().state).toEqual(problem.initialState);
      expect(strategy.hasNext()).toBeFalsy();
      expect(() => strategy.next()).toThrow();
    });
    it('should expand initial state with successors at back of queue', () => {
      const nextStates = problem
        .successor.successors(problem.initialState)
        .map(s => s[1]);
      strategy.init(problem);
      strategy.expand(strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(nextStates.length + 1);
      expect(strategy.nodes[0].state).toEqual(problem.initialState);
      expect(strategy.nodes.slice(1).map(n => n.state)).toEqual(nextStates);
    });
  });
  describe('DepthLimited', () => {
    const strategy = new search.DepthLimited();
    it('should initialize from problem initial state', () => {
      strategy.init(problem);
      expect(strategy.nodes.length).toEqual(1);
      expect(strategy.nodes[0].state).toEqual(problem.initialState);
    });
    it('should iterate nodes', () => {
      strategy.init(problem);
      expect(strategy.hasNext()).toBeTruthy();
      expect(strategy.next().state).toEqual(problem.initialState);
      expect(strategy.hasNext()).toBeFalsy();
      expect(() => strategy.next()).toThrow();
    });
    it('should expand initial state with successors at front of queue', () => {
      const nextStates = [];
      for (let succ of problem.successor.successors(problem.initialState)) {
        nextStates.unshift(succ[1]);
      }
      strategy.init(problem);
      strategy.expand(strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(nextStates.length + 1);
      expect(strategy.nodes[nextStates.length].state).toEqual(problem.initialState);
      expect(strategy.nodes.slice(0, nextStates.length).map(n => n.state)).toEqual(nextStates);
    });
    it('should not expand nodes beyond max depth', () => {
      strategy.maxDepth = 1;
      strategy.init(problem);
      strategy.nodes[0].depth = 5;
      expect(strategy.nodes.length).toEqual(1);
      strategy.expand(strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(1);
    });
  });
  describe('IterativeDeepening', () => {
    const strategy = new search.IterativeDeepening();
    it('should initialize from problem initial state', () => {
      strategy.init(problem);
      expect(strategy.nodes.length).toEqual(1);
      expect(strategy.nodes[0].state).toEqual(problem.initialState);
    });
    it('should increase depth after iterating level 0', () => {
      strategy.init(problem);
      expect(strategy.hasNext()).toBeTruthy();
      expect(strategy.depth).toEqual(0);
      expect(strategy.next().state).toEqual(problem.initialState);
      expect(strategy.hasNext()).toBeTruthy();
      expect(strategy.next().state).toEqual(problem.initialState);
      expect(strategy.depth).toEqual(1);
    });
    it('should expand initial state with successors at front of queue', () => {
      const nextStates = [];
      for (let succ of problem.successor.successors(problem.initialState)) {
        nextStates.unshift(succ[1]);
      }
      strategy.init(problem);
      strategy.depth = 1;
      strategy.expand(strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(nextStates.length + 1);
      expect(strategy.nodes[nextStates.length].state).toEqual(problem.initialState);
      expect(strategy.nodes.slice(0, nextStates.length).map(n => n.state)).toEqual(nextStates);
    });
    it('should not expand nodes beyond current depth', () => {
      strategy.depth = 1;
      strategy.init(problem);
      strategy.nodes[0].depth = 5;
      expect(strategy.nodes.length).toEqual(1);
      strategy.expand(strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(1);
    });
  });
  describe('AStar', () => {
    const strategy = new search.AStar();
    it('should initialize from problem initial state', () => {
      strategy.init(problem);
      expect(strategy.nodes.length).toEqual(1);
      expect(strategy.nodes[0].state).toEqual(problem.initialState);
    });
    it('should iterate nodes', () => {
      strategy.init(problem);
      expect(strategy.hasNext()).toBeTruthy();
      expect(strategy.next().state).toEqual(problem.initialState);
      expect(strategy.hasNext()).toBeFalsy();
      expect(() => strategy.next()).toThrow();
    });
    it('should expand initial state with successors', () => {
      strategy.init(problem);
      strategy.expand(strategy.next());
      expect(strategy.nodes.length).toEqual(2);
    });
    it('should retain node with lowest cost if state is same', () => {
      strategy.init(problem);
      strategy.expand(strategy.next());
      const first = strategy.nodes[0];
      const second = Object.assign({}, first, {
        depth: first.depth - 1
      });
      strategy.retainBest(0, second);
      expect(strategy.nodes[0]).toEqual(second);
      strategy.retainBest(0, first);
      expect(strategy.nodes[0]).toEqual(second);
    })
  });
  describe('Searcher', () => {
    it('should finish searching at goal state', () => {
      const strategy = new search.BreadthFirst();
      const searcher = new search.Search(problem, strategy);
      expect(searcher.search()).toBeTruthy();
      expect(searcher.solution).toBeTruthy();
    });
    it('should expand nodes if not at goal state', () => {
      problem.initialState = [1, 2, 3, 4, 9, 6, 7, 8, 5];
      const strategy = new search.BreadthFirst();
      strategy.expand = jest.fn(() => { });
      const searcher = new search.Search(problem, strategy);
      expect(searcher.search()).toBeFalsy();
      expect(searcher.solution).toBeFalsy();
      expect(strategy.expand.mock.calls.length).toEqual(1);
    })
  });
  describe('Heuristic', () => {
    const heur = new search.Heuristic(settings);
    it('should calculate cost as zero if state is goal', () => {
      const state = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const dist = heur.estimatedPathCost(state, state);
      expect(dist).toEqual(0);
    });
    it('should calculate city block distance for item', () => {
      const state = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < state.length; i++) {
        state.push(state.shift());
        const dist = heur.cityBlockDistance(8 - i, 8);
        expect(dist).toEqual(Math.floor(i / 3) + i % 3);
      }
    });
    it('should calculate sum of city block distances for state', () => {
      const goal = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < goal.length; i++) {
        const state = Array.from(goal);
        state[8] = state[i];
        state[i] = 9;
        const dist = heur.estimatedPathCost(state, goal);
        expect(dist).toEqual(heur.cityBlockDistance(i, 8) * 2);
      }
    });
  });
  describe('pathCostComparator', () => {
    it('should sort search nodes by path cost', () => {
      const xs = [];
      const size = 10;
      for (let i = 0; i < size; i++) {
        xs.push({ pathCost: i });
      }
      const ys = Array.from(xs);
      ys.reverse();
      expect(ys).not.toEqual(xs);
      ys.sort(search.pathCostComparator);
      expect(ys).toEqual(xs);
    });
  });
});