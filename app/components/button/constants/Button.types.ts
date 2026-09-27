export const BUTTON = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DANGER: "danger",
  BASE: "base",
  DARK_GREEN: "dark_green",
  ORANGE: "orange",
  LIME: "lime",
  CANCEL: "cancel",
  CONFIRM: "confirm",
  CLOSE: "close",
  BRAND_BLUE: "brand_blue",
} as const;

export type BUTTON = (typeof BUTTON)[keyof typeof BUTTON];
