import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { parseDefaultDurationMinutes } from "./parseDefaultDurationMinutes";
import { parseUsageMetric } from "./parseUsageMetric";

export const mapCategoryBehaviorFormValuesToInput = (
  categoryId: string,
  values: CategoryBehaviorFormValues
): UpdateCategoryBehaviorInput => ({
  categoryId,
  isReservable: values.isReservable,
  hasMotor: values.hasMotor,
  usageMetric: parseUsageMetric(values.usageMetric),
  consumesFuel: values.consumesFuel,
  canBeDamaged: values.canBeDamaged,
  hasConditionPhotos: values.hasConditionPhotos,
  guideOnly: values.guideOnly,
  defaultDurationMinutes: parseDefaultDurationMinutes(
    values.defaultDurationMinutes
  ),
  unitsAreInterchangeable: values.unitsAreInterchangeable,
});
