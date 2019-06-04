import { Settings } from './Settings';
import Shuffle from './Shuffle';

describe('Shuffle', () => {
  const eight = new Settings(3);
  const fifteen = new Settings(4);
  it('should shuffle 8 tile puzzle', () => {
    const shuffle = new Shuffle(eight);
    const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffled = shuffle.shuffle(tiles, 25).state;
    expect(shuffled.length).toEqual(tiles.length);
    expect(shuffled.every(x => tiles.includes(x))).toBeTruthy();
    expect(shuffled).not.toEqual(tiles);
  });
  it('should shuffle 15 tile puzzle', () => {
    const shuffle = new Shuffle(fifteen);
    const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const shuffled = shuffle.shuffle(tiles, 25).state;
    expect(shuffled.length).toEqual(tiles.length);
    expect(shuffled.every(x => tiles.includes(x))).toBeTruthy();
    expect(shuffled).not.toEqual(tiles);
  });
});