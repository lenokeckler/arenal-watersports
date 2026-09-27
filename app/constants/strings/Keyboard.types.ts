export const KEYBOARD = {
  SPACE: "Space",
  ENTER: "Enter",
  ARROW_RIGHT: "ArrowRight",
  ARROW_LEFT: "ArrowLeft",
  ESCAPE: "Escape",
  EXIT: "exit",
} as const;

export type Keyboard =
  (typeof KEYBOARD)[keyof typeof KEYBOARD];
