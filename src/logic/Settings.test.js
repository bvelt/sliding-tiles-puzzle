
import { Settings } from './Settings';

describe('Settings', () => {
  test('should create setting with default values', () => {
    const settings = new Settings();
    expect(settings.columnCount).toEqual(4);
    expect(settings.rowCount).toEqual(4);
  });
  test('should create setting with specified values', () => {
    const settings = new Settings(1, 2);
    expect(settings.columnCount).toEqual(1);
    expect(settings.rowCount).toEqual(2);
  });
});