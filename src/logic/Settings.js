export class Settings {
  static DEFAULT_SIZE = 3;

  constructor(columnCount = Settings.DEFAULT_SIZE, rowCount = columnCount) {
    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.blankSpace = rowCount * columnCount;
  }
}

export const defaultSettings = new Settings();

