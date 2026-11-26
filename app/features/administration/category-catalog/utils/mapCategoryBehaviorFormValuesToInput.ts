import { DEFAULT_LOW_FUEL_LINES } from "../constants/CategoryBehaviorValidation.constants";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { parseDefaultDurationMinutes } from "./parseDefaultDurationMinutes";
import { parseLowFuelLines } from "./parseLowFuelLines";
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
  lowFuelLines:
    parseLowFuelLines(values.lowFuelLines) ??
    DEFAULT_LOW_FUEL_LINES,
  canBeDamaged: values.canBeDamaged,
  hasConditionPhotos: values.hasConditionPhotos,
  guideOnly: values.guideOnly,
  defaultDurationMinutes: parseDefaultDurationMinutes(
    values.defaultDurationMinutes
  ),
  unitsAreInterchangeable: values.unitsAreInterchangeable,
});
