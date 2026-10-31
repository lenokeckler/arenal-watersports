export const CALENDAR_HEAT_LEVEL = {
  NONE: "none",
  GREEN: "green",
  ORANGE: "orange",
  RED: "red",
} as const;

export type CalendarHeatLevel =
  (typeof CALENDAR_HEAT_LEVEL)[keyof typeof CALENDAR_HEAT_LEVEL];
