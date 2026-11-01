import {
  UNIT_USAGE_METRIC,
  type UnitUsageMetric,
} from "./UnitUsageMetric.constants";

export const UNIT_USAGE_UNIT_LABEL: Record<
  UnitUsageMetric,
  string
> = {
  [UNIT_USAGE_METRIC.ENGINE_HOURS]: "horas",
  [UNIT_USAGE_METRIC.KILOMETERS]: "km",
};
