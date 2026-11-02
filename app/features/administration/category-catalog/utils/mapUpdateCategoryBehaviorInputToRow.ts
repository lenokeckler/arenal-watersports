import type { CategoryBehaviorRowUpdate } from "../models/CategoryBehaviorRowUpdate.type";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";

export const mapUpdateCategoryBehaviorInputToRow = (
  input: UpdateCategoryBehaviorInput,
  adminWorkerId: string
): CategoryBehaviorRowUpdate => ({
  is_reservable: input.isReservable,
  has_motor: input.hasMotor,
  usage_metric: input.usageMetric ?? null,
  consumes_fuel: input.consumesFuel,
  can_be_damaged: input.canBeDamaged,
  has_condition_photos: input.hasConditionPhotos,
  guide_only: input.guideOnly,
  default_duration_minutes:
    input.defaultDurationMinutes ?? null,
  units_are_interchangeable: input.unitsAreInterchangeable,
  updated_by: adminWorkerId,
});
