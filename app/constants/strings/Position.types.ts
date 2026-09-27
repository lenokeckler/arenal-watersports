export const POSITION = {
  VERTICAL: "vertical",
  CENTER: "center",
  LEFT: "left",
  RIGHT: "right",
  NEXT: "Next",
  PREV: "Previous",
} as const;

export type Position =
  (typeof POSITION)[keyof typeof POSITION];
