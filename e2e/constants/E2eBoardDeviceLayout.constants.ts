export const E2E_BOARD_DEVICE_LAYOUT = {
  DRAGGED_INDEX: 0,
  DRAG_STEPS: 12,
  FIRST_INDEX: 0,
  LONG_PRESS_HOLD_MS: 600,
  MIN_CATEGORIES: 3,
  ROW_LABEL_SELECTOR: ":scope > :first-child",
  SCROLL_BLOCK: "center",
  TARGET_INDEX: 2,
  UNKNOWN_CATEGORY_ID: "category-administration-removed",
} as const;

export const E2E_BOARD_DEVICE_LAYOUT_TOUCH = {
  COMMAND: "Input.dispatchTouchEvent",
  END: "touchEnd",
  MOVE: "touchMove",
  START: "touchStart",
} as const;

export const E2E_BOARD_DEVICE_LAYOUT_SCREENSHOT = {
  PANEL: "us-tab-12-board-layout-panel",
  REORDERED_BOARD: "us-tab-12-board-layout-reordered",
  THREE_PER_ROW: "us-tab-12-board-layout-three-per-row",
} as const;

export const E2E_BOARD_DEVICE_LAYOUT_OPERATION = {
  DRAG: "drag a category handle in the board panel",
  NOT_LAID_OUT: "the handle has no layout box",
} as const;
