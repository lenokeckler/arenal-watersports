import type { NullableRef } from "@/app/types";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import type { UsageMetric } from "../models/UsageMetric.type";

export const parseUsageMetric = (
  metricText: string
): NullableRef<UsageMetric> =>
  Object.values(USAGE_METRIC).find(
    (usageMetric) => usageMetric === metricText
  ) ?? null;
