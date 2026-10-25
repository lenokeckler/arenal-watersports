import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";

export const FAKE_UPDATE_CATEGORY_ID = "fake-category-id";
export const FAKE_UPDATE_ADMIN_WORKER_ID =
  "fake-admin-worker-id";
export const FAKE_DEFAULT_DURATION_MINUTES = 60;

export const DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT: UpdateCategoryBehaviorInput =
  {
    categoryId: FAKE_UPDATE_CATEGORY_ID,
    isReservable: true,
    hasMotor: true,
    usageMetric: USAGE_METRIC.ENGINE_HOURS,
    consumesFuel: true,
    canBeDamaged: true,
    hasConditionPhotos: false,
    guideOnly: false,
    defaultDurationMinutes: FAKE_DEFAULT_DURATION_MINUTES,
    unitsAreInterchangeable: true,
  };
