import States from './States';

describe('States', () => {
  test('should add state if state not already added', () => {
    const states = new States();
    const one = [1, 2, 3];
    const two = [3, 2, 1];
    expect(states.addLastIfAbsent(one)).toBeTruthy();
    expect(states.addLastIfAbsent(two)).toBeTruthy();
    expect(states.states).toContain(one);
    expect(states.states).toContain(two);
  });
  test('should not add state if state already added', () => {
    const states = new States();
    const one = [1, 2, 3];
    expect(states.addLastIfAbsent(one)).toBeTruthy();
    expect(states.addLastIfAbsent(one)).toBeFalsy();
    expect(states.states).toContain(one);
  });
})