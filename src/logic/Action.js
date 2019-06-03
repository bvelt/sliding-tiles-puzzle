export const actionTypes = {
  BLANK_UP: "blank/up",
  BLANK_RIGHT: "blank/right",
  BLANK_DOWN: "blank/down",
  BLANK_LEFT: "blank/left"
}

export class ActionFactory {
  blankUp(fromIndex, toIndex) {
    return {
      type: actionTypes.BLANK_UP,
      fromIndex: fromIndex,
      toIndex: toIndex
    };
  }
  blankRight(fromIndex, toIndex) {
    return {
      type: actionTypes.BLANK_RIGHT,
      fromIndex: fromIndex,
      toIndex: toIndex
    };
  }
  blankDown(fromIndex, toIndex) {
    return {
      type: actionTypes.BLANK_DOWN,
      fromIndex: fromIndex,
      toIndex: toIndex
    };
  }
  blankLeft(fromIndex, toIndex) {
    return {
      type: actionTypes.BLANK_LEFT,
      fromIndex: fromIndex,
      toIndex: toIndex
    };
  }
}