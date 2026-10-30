import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import { parseUsageMetric } from "./parseUsageMetric";

export const applyUsageMetricChange = (
  values: CategoryBehaviorFormValues,
  rawUsageMetric: string
): CategoryBehaviorFormValues => {
  const usageMetric = parseUsageMetric(rawUsageMetric);

  if (!values.hasMotor || usageMetric === null) {
    return values;
  }

  return { ...values, usageMetric };
};
