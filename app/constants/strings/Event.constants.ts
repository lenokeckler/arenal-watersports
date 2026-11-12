export const EVENT = {
  CHANGE: "change",
  CLICK: "click",
  KEYDOWN: "keydown",
  KEYUP: "keyup",
  MOUSEDOWN: "mousedown",
  MOUSEMOVE: "mousemove",
  POINTERDOWN: "pointerdown",
  SCROLL: "scroll",
  SUBMIT: "submit",
  TOUCHSTART: "touchstart",
  WHEEL: "wheel",
} as const;
export type EventType = (typeof EVENT)[keyof typeof EVENT];
