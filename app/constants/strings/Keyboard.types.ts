export const KEYBOARD = {
  SPACE: "Space",
  ENTER: "Enter",
  ARROW_DOWN: "ArrowDown",
  ARROW_RIGHT: "ArrowRight",
  ARROW_LEFT: "ArrowLeft",
  ARROW_UP: "ArrowUp",
  ESCAPE: "Escape",
  EXIT: "exit",
} as const;

export type Keyboard =
  (typeof KEYBOARD)[keyof typeof KEYBOARD];
