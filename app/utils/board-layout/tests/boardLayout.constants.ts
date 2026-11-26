export const BOARD_IDS = {
  JET_SKI: "jet-ski",
  KAYAK: "kayak",
  PADDLE: "paddle",
  SUP: "sup",
} as const;

export const STORED_LAYOUT_JSON = {
  CORRUPT: "{not json",
  FOREIGN_COLUMNS: JSON.stringify({
    columns: 5,
    order: [BOARD_IDS.KAYAK],
  }),
  MIXED_ORDER: JSON.stringify({
    columns: 3,
    order: [BOARD_IDS.KAYAK, 7, BOARD_IDS.JET_SKI],
  }),
  NOT_AN_OBJECT: JSON.stringify([1, 2]),
  VALID: JSON.stringify({
    columns: 3,
    order: [BOARD_IDS.KAYAK, BOARD_IDS.JET_SKI],
  }),
};

export const UNSUPPORTED_COLUMNS = 4;
export const TWO_COLUMNS = 2;
export const TWO_COLUMNS_AS_TEXT = "2";
export const THREE_COLUMNS = 3;
export const POINTER_ABOVE_LIST = -20;
export const POINTER_INSIDE_FIRST_SLOT = 10;
export const POINTER_INSIDE_SECOND_SLOT = 80;
export const POINTER_INSIDE_LAST_SLOT = 140;
export const POINTER_IN_GAP_AFTER_FIRST_SLOT = 55;
export const POINTER_BELOW_LIST = 500;
export const NOT_FOUND_INDEX = -1;
export const FIRST_INDEX = 0;
export const SECOND_INDEX = 1;
export const THIRD_INDEX = 2;
export const SLOT_HEIGHT = 50;
export const SLOT_GAP = 10;
export const SLOT_COUNT = 3;
