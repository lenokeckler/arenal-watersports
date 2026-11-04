const REACHED: unique symbol = Symbol("time-limit-reached");

export const TIME_LIMIT = {
  REACHED,
} as const;
