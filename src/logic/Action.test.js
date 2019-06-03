import { actionTypes, ActionFactory } from './Action';

describe('Action', () => {
  const factory = new ActionFactory();
  test('should create blankUp action', () => {
    const fromIndex = 4;
    const toIndex = 0;
    const action = factory.blankUp(fromIndex, toIndex);
    expect(action.type).toEqual(actionTypes.BLANK_UP);
    expect(action.fromIndex).toEqual(fromIndex);
    expect(action.toIndex).toEqual(toIndex);
  });
  test('should create blankDown action', () => {
    const fromIndex = 0;
    const toIndex = 4;
    const action = factory.blankDown(fromIndex, toIndex);
    expect(action.type).toEqual(actionTypes.BLANK_DOWN);
    expect(action.fromIndex).toEqual(fromIndex);
    expect(action.toIndex).toEqual(toIndex);
  });
  test('should create blankLeft action', () => {
    const fromIndex = 1;
    const toIndex = 0;
    const action = factory.blankLeft(fromIndex, toIndex);
    expect(action.type).toEqual(actionTypes.BLANK_LEFT);
    expect(action.fromIndex).toEqual(fromIndex);
    expect(action.toIndex).toEqual(toIndex);
  });
  test('should create blankRight action', () => {
    const fromIndex = 0;
    const toIndex = 1;
    const action = factory.blankRight(fromIndex, toIndex);
    expect(action.type).toEqual(actionTypes.BLANK_RIGHT);
    expect(action.fromIndex).toEqual(fromIndex);
    expect(action.toIndex).toEqual(toIndex);
  });
})