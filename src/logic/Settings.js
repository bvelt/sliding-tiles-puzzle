export class Settings {
  constructor(columnCount = 4, rowCount = columnCount) {
    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.blankSpace = rowCount * columnCount;
  }
}

export const defaultSettings = new Settings();

