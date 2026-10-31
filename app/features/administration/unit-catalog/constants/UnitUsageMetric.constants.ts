export const UNIT_USAGE_METRIC = {
  ENGINE_HOURS: "engine_hours",
  KILOMETERS: "kilometers",
} as const;

export type UnitUsageMetric =
  (typeof UNIT_USAGE_METRIC)[keyof typeof UNIT_USAGE_METRIC];
