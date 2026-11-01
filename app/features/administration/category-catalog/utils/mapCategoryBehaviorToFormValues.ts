import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";

export const mapCategoryBehaviorToFormValues = (
  behavior: CategoryBehavior
): CategoryBehaviorFormValues => ({
  isReservable: behavior.isReservable,
  hasMotor: behavior.hasMotor,
  usageMetric: safeString(behavior.usageMetric),
  consumesFuel: behavior.consumesFuel,
  canBeDamaged: behavior.canBeDamaged,
  hasConditionPhotos: behavior.hasConditionPhotos,
  guideOnly: behavior.guideOnly,
  defaultDurationMinutes: safeString(
    behavior.defaultDurationMinutes?.toString()
  ),
  unitsAreInterchangeable: behavior.unitsAreInterchangeable,
});
