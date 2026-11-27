export const DOCUMENT = {
  SMOOTH: "smooth",
  HIDDEN: "hidden",
  AUTO: "auto",
  START: "start",
} as const;

export type String =
  (typeof DOCUMENT)[keyof typeof DOCUMENT];
