export const SIZE = {
  NONE: "none",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
  XXL: "xxl",
  FULL: "full",
} as const;

export type SIZE = (typeof SIZE)[keyof typeof SIZE];
