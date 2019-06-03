import Problem from './Problem';
import { Settings } from './Settings';

describe('Problem', () => {
  const eight = new Settings(3);
  test('should create initial state', () => {
    const problem = new Problem(eight);
    const initial = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(problem.initialState).toEqual(initial);
  });
  test('should confirm goal state', () => {
    const problem = new Problem(eight);
    expect(problem.goalTest(problem.initialState)).toBeTruthy();
    expect(problem.goalTest([1, 2, 3, 4, 5])).toBeFalsy();
    expect(problem.goalTest([1, 2, 3, 4, 5, 6, 7, 8, 10])).toBeFalsy();
  });
});