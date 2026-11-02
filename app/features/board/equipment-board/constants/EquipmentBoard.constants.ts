export const EQUIPMENT_BOARD_BAR = {
  PRESERVE_ASPECT_RATIO: "none",
  VIEWBOX: "0 0 100 1",
  VIEWBOX_HEIGHT: 1,
} as const;

export const EQUIPMENT_BOARD_COUNT = {
  SINGULAR: 1,
} as const;

export const EQUIPMENT_BOARD_IMAGE = {
  HEIGHT: 600,
  SIZES:
    "(min-width: 1024px) 384px, (min-width: 768px) 33vw, 50vw",
  WIDTH: 600,
} as const;

export const EQUIPMENT_BOARD_PERCENT = {
  MAX: 100,
} as const;

export const EQUIPMENT_BOARD_SKELETON = {
  CARD_COUNT: 6,
} as const;

export const EQUIPMENT_BOARD_SKELETON_INDEXES = Array.from(
  { length: EQUIPMENT_BOARD_SKELETON.CARD_COUNT },
  (_, index) => index
);
