export const BOARD_LAYOUT_COLUMNS = {
  THREE: 3,
  TWO: 2,
} as const;

export type BoardLayoutColumns =
  (typeof BOARD_LAYOUT_COLUMNS)[keyof typeof BOARD_LAYOUT_COLUMNS];

export const BOARD_LAYOUT_COLUMN_OPTIONS: readonly BoardLayoutColumns[] =
  [BOARD_LAYOUT_COLUMNS.TWO, BOARD_LAYOUT_COLUMNS.THREE];

export const BOARD_LAYOUT_STORAGE_KEY =
  "arenal-ops-board-layout";

export const BOARD_LAYOUT_STORAGE_FIELD = {
  COLUMNS: "columns",
  ORDER: "order",
} as const;
