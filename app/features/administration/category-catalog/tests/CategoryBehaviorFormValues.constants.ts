import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";

export const VALID_CATEGORY_BEHAVIOR_FORM_VALUES: CategoryBehaviorFormValues =
  {
    isReservable: true,
    hasMotor: true,
    usageMetric: USAGE_METRIC.ENGINE_HOURS,
    consumesFuel: true,
    canBeDamaged: true,
    hasConditionPhotos: false,
    guideOnly: false,
    defaultDurationMinutes: "60",
    unitsAreInterchangeable: true,
  };
