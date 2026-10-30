import { USAGE_METRIC } from "../constants/UsageMetric.constants";

export type UsageMetric =
  (typeof USAGE_METRIC)[keyof typeof USAGE_METRIC];
