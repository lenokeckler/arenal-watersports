export const FUEL_GAUGE_LINE = {
  EMPTY: 0,
  FIRST: 1,
} as const;

export const FUEL_PRESET_ID = {
  FULL: "full",
  HALF: "half",
  QUARTER: "quarter",
  THREE_QUARTERS: "three-quarters",
} as const;

export const FUEL_PARTIAL_PRESETS = [
  { fraction: 0.25, id: FUEL_PRESET_ID.QUARTER },
  { fraction: 0.5, id: FUEL_PRESET_ID.HALF },
  { fraction: 0.75, id: FUEL_PRESET_ID.THREE_QUARTERS },
] as const;

export const FUEL_PRESET_TOLERANCE = 0.125;

export const FUEL_GAUGE_TIER = {
  HIGH: "high",
  LOW: "low",
  LOW_FRACTION: 0.25,
  MEDIUM: "medium",
  MEDIUM_FRACTION: 0.5,
} as const;
