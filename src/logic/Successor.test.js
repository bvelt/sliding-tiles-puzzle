import Successor from './Successor';
import { Settings } from './Settings';
import { actionTypes } from './Action';

describe('Successor', () => {
  const settings = new Settings(3);
  const successor = new Successor(settings);
  function matchers(start, expectedActions, successors) {
    expect(successors.length).toEqual(expectedActions.length);
    for (let expectedAction of expectedActions) {
      expect(successors.some(([action, state]) =>
        action.type === expectedAction[0]
        && action.fromIndex === expectedAction[1]
        && action.toIndex === expectedAction[2]
        && state[expectedAction[2]] === start[expectedAction[1]]
        && state[expectedAction[1]] === start[expectedAction[2]])).toBeTruthy();
    }
  }
  test('create 4 successors when blank can move any direction', () => {
    const start = [1, 2, 3, 4, 9, 6, 7, 8, 5];
    const expectedActions = [
      [actionTypes.BLANK_UP, 4, 1],
      [actionTypes.BLANK_RIGHT, 4, 5],
      [actionTypes.BLANK_DOWN, 4, 7],
      [actionTypes.BLANK_LEFT, 4, 3]
    ];
    matchers(start, expectedActions, successor.successors(start));
  });
  test('create 3 successors when blank can move left, right, or down', () => {
    const start = [1, 9, 3, 4, 5, 6, 7, 8, 2];
    const expectedActions = [
      [actionTypes.BLANK_RIGHT, 1, 2],
      [actionTypes.BLANK_DOWN, 1, 4],
      [actionTypes.BLANK_LEFT, 1, 0]
    ];
    matchers(start, expectedActions, successor.successors(start));
  });
  test('create 3 successors when blank can move left, right, or up', () => {
    const start = [1, 2, 3, 4, 5, 6, 7, 9, 8];
    const expectedActions = [
      [actionTypes.BLANK_RIGHT, 7, 8],
      [actionTypes.BLANK_UP, 7, 4],
      [actionTypes.BLANK_LEFT, 7, 6]
    ];
    matchers(start, expectedActions, successor.successors(start));
  });
  test('create 3 successors when blank can move up, down, or left', () => {
    const start = [1, 2, 3, 4, 5, 9, 7, 8, 6];
    const expectedActions = [
      [actionTypes.BLANK_UP, 5, 2],
      [actionTypes.BLANK_DOWN, 5, 8],
      [actionTypes.BLANK_LEFT, 5, 4]
    ];
    matchers(start, expectedActions, successor.successors(start));
  }); 
  test('create 3 successors when blank can move up, down, or right', () => {
    const start = [1, 2, 3, 9, 5, 6, 7, 8, 4];
    const expectedActions = [
      [actionTypes.BLANK_UP, 3, 0],
      [actionTypes.BLANK_DOWN, 3, 6],
      [actionTypes.BLANK_RIGHT, 3, 4]
    ];
    matchers(start, expectedActions, successor.successors(start));
  });
  test('create 2 successors when blank in top right corner', () => {
    const start = [1, 2, 9, 4, 5, 6, 7, 8, 3];
    const expectedActions = [
      [actionTypes.BLANK_DOWN, 2, 5],
      [actionTypes.BLANK_LEFT, 2, 1]
    ];
    matchers(start, expectedActions, successor.successors(start));
  });
  test('create 2 successors when blank in top left corner', () => {
    const start = [9, 2, 3, 4, 5, 6, 7, 8, 1];
    const expectedActions = [
      [actionTypes.BLANK_DOWN, 0, 3],
      [actionTypes.BLANK_RIGHT, 0, 1]
    ];
    matchers(start, expectedActions, successor.successors(start));
  });
  test('create 2 successors when blank in bottom right corner', () => {
    const start = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const expectedActions = [
      [actionTypes.BLANK_UP, 8, 5],
      [actionTypes.BLANK_LEFT, 8, 7]
    ];
    matchers(start, expectedActions, successor.successors(start));
  });
  test('create 2 successors when blank in bottom left corner', () => {
    const start = [1, 2, 3, 4, 5, 6, 9, 8, 7];
    const expectedActions = [
      [actionTypes.BLANK_UP, 6, 3],
      [actionTypes.BLANK_RIGHT, 6, 7]
    ];
    matchers(start, expectedActions, successor.successors(start));
  });
});