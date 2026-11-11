export const E2E_OUT_ON_WATER_SCREENSHOT_BASENAME = {
  ADJUST: "14-out-on-water-adjust",
  LATE: "13-out-on-water-late",
  LIST: "12-out-on-water",
} as const;

export const E2E_OUT_ON_WATER_REMAINING_PATTERN =
  /Faltan .+/;

export const E2E_OUT_ON_WATER_LATE_PATTERN =
  /\d+ min de retraso/;

export const E2E_OUT_ON_WATER_ADJUST = {
  ADD_PRESET: "+30 min",
  ADDED_MINUTES: 30,
  PLAN_MINUTES: 60,
} as const;
