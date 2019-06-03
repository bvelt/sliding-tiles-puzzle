import Reducer from './Reducer';
import { ActionFactory } from './Action';

describe('Reducer', () => {
  const factory = new ActionFactory();
  const reducer = new Reducer();
  test('should move blank tile up', () => {
    const tiles = [1, 2, 3, 4];
    const action = factory.blankUp(0, 3);
    const moved = reducer.reduce(tiles, action);
    expect(moved).toEqual([4, 2, 3, 1]);
  });
  test('should move blank tile right', () => {
    const tiles = [1, 2, 3, 4];
    const action = factory.blankRight(0, 1);
    const moved = reducer.reduce(tiles, action);
    expect(moved).toEqual([2, 1, 3, 4]);
  });
  test('should move blank tile down', () => {
    const tiles = [1, 2, 3, 4];
    const action = factory.blankDown(3, 0);
    const moved = reducer.reduce(tiles, action);
    expect(moved).toEqual([4, 2, 3, 1]);
  });
  test('should move blank tile left', () => {
    const tiles = [1, 2, 3, 4];
    const action = factory.blankDown(1, 0);
    const moved = reducer.reduce(tiles, action);
    expect(moved).toEqual([2, 1, 3, 4]);
  });
});