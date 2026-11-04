import { STRING } from "@/app/constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import { parseUsageMetric } from "./parseUsageMetric";

export const applyHasMotorChange = (
  values: CategoryBehaviorFormValues,
  hasMotor: boolean
): CategoryBehaviorFormValues => {
  if (!hasMotor) {
    return {
      ...values,
      hasMotor,
      usageMetric: STRING.Empty,
    };
  }

  return {
    ...values,
    hasMotor,
    usageMetric:
      parseUsageMetric(values.usageMetric) ??
      USAGE_METRIC.ENGINE_HOURS,
  };
};
