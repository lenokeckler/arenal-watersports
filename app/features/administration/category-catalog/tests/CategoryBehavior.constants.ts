import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";
import { FAKE_DEFAULT_DURATION_MINUTES } from "./UpdateCategoryBehaviorInput.constants";

export const DEFAULT_CATEGORY_BEHAVIOR: CategoryBehavior = {
  id: FAKE_CATEGORY_ID,
  trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
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
