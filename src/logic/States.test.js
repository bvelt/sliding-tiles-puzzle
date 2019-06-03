import States from './States';

describe('States', () => {
  test('should add state if state not already added', () => {
    const states = new States();
    const one = [1, 2, 3];
    const two = [3, 2, 1];
    expect(states.put(one)).toBeTruthy();
    expect(states.put(two)).toBeTruthy();
    expect(states.states).toContain(one);
    expect(states.states).toContain(two);
  });
  test('should not add state if state already added', () => {
    const states = new States();
    const one = [1, 2, 3];
    expect(states.put(one)).toBeTruthy();
    expect(states.put(one)).toBeFalsy();
    expect(states.states).toContain(one);
  });
})