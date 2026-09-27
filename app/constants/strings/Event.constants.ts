export const EVENT = {
  MOUSEDOWN: "mousedown",
  CLICK: "click",
  KEYDOWN: "keydown",
  KEYUP: "keyup",
  SUBMIT: "submit",
  CHANGE: "change",
  SCROLL: "scroll",
  MOUSEMOVE: "mousemove",
  TOUCHSTART: "touchstart",
  WHEEL: "wheel",
} as const;
export type EventType = (typeof EVENT)[keyof typeof EVENT];
