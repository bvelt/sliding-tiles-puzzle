import * as search from './Search';
import { Settings } from './Settings';
import Problem from './Problem';

describe('Search', () => {
  const settings = new Settings(3);
  const problem = new Problem(settings);
  describe('BreadthFirst', () => {
    const strategy = new search.BreadthFirst();
    it('should initialize from problem initial state', () => {
      strategy.init(problem.initialState);
      expect(strategy.nodes.length).toEqual(1);
      expect(strategy.nodes[0].state).toEqual(problem.initialState);
    });
    it('should iterate nodes', () => {
      strategy.init(problem.initialState);
      expect(strategy.hasNext()).toBeTruthy();
      expect(strategy.next().state).toEqual(problem.initialState);
      expect(strategy.hasNext()).toBeFalsy();
      expect(() => strategy.next()).toThrow();
    });
    it('should expand initial state with successors at back of queue', () => {
      const nextStates = problem
        .successor.successors(problem.initialState)
        .map(s => s[1]);
      strategy.init(problem.initialState);
      strategy.expand(problem, strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(nextStates.length + 1);
      expect(strategy.nodes[0].state).toEqual(problem.initialState);
      expect(strategy.nodes.slice(1).map(n => n.state)).toEqual(nextStates);
    });
  });
  describe('DepthLimited', () => {
    const strategy = new search.DepthLimited();
    it('should initialize from problem initial state', () => {
      strategy.init(problem.initialState);
      expect(strategy.nodes.length).toEqual(1);
      expect(strategy.nodes[0].state).toEqual(problem.initialState);
    });
    it('should iterate nodes', () => {
      strategy.init(problem.initialState);
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
      strategy.init(problem.initialState);
      strategy.expand(problem, strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(nextStates.length + 1);
      expect(strategy.nodes[nextStates.length].state).toEqual(problem.initialState);
      expect(strategy.nodes.slice(0, nextStates.length).map(n => n.state)).toEqual(nextStates);
    });
    it('should not expand nodes beyond max depth', () => {
      strategy.maxDepth = 1;
      strategy.init(problem.initialState);
      strategy.nodes[0].depth = 5;
      expect(strategy.nodes.length).toEqual(1);
      strategy.expand(problem, strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(1);
    });
  });
  describe('IterativeDeepening', () => {
    const strategy = new search.IterativeDeepening();
    it('should initialize from problem initial state', () => {
      strategy.init(problem.initialState);
      expect(strategy.nodes.length).toEqual(1);
      expect(strategy.nodes[0].state).toEqual(problem.initialState);
    });
    it('should increase depth after iterating level 0', () => {
      strategy.init(problem.initialState);
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
      strategy.init(problem.initialState);
      strategy.depth = 1;
      strategy.expand(problem, strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(nextStates.length + 1);
      expect(strategy.nodes[nextStates.length].state).toEqual(problem.initialState);
      expect(strategy.nodes.slice(0, nextStates.length).map(n => n.state)).toEqual(nextStates);
    });
    it('should not expand nodes beyond current depth', () => {
      strategy.depth = 1;
      strategy.init(problem.initialState);
      strategy.nodes[0].depth = 5;
      expect(strategy.nodes.length).toEqual(1);
      strategy.expand(problem, strategy.nodes[0]);
      expect(strategy.nodes.length).toEqual(1);
    });
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
});