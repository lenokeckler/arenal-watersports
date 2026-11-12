import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import type { EquipmentCategoryRow } from "../models/EquipmentCategoryRow.type";

export const mapCategoryRowToBehavior = (
  categoryRow: EquipmentCategoryRow
): CategoryBehavior => ({
  id: categoryRow.id,
  trackingMode: categoryRow.tracking_mode,
  isReservable: categoryRow.is_reservable,
  hasMotor: categoryRow.has_motor,
  usageMetric: categoryRow.usage_metric,
  consumesFuel: categoryRow.consumes_fuel,
  canBeDamaged: categoryRow.can_be_damaged,
  hasConditionPhotos: categoryRow.has_condition_photos,
  guideOnly: categoryRow.guide_only,
  defaultDurationMinutes:
    categoryRow.default_duration_minutes,
  unitsAreInterchangeable:
    categoryRow.units_are_interchangeable,
});
