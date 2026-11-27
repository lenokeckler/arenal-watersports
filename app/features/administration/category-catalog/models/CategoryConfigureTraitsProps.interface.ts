import type { CategoryBehaviorFieldAvailability } from "./CategoryBehaviorFieldAvailability.interface";
import type { CategoryBehaviorFormErrors } from "./CategoryBehaviorFormErrors.interface";
import type { CategoryBehaviorFormValues } from "./CategoryBehaviorFormValues.interface";
import type { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryConfigureTraitsProps {
  values: CategoryBehaviorFormValues;
  errors: CategoryBehaviorFormErrors;
  availability: CategoryBehaviorFieldAvailability;
  onUnitsAreInterchangeableChange: CategoryFormFieldChangeHandler;
  onHasMotorChange: CategoryFormFieldChangeHandler;
  onUsageMetricChange: CategoryFormFieldChangeHandler;
  onConsumesFuelChange: CategoryFormFieldChangeHandler;
  onLowFuelLinesChange: CategoryFormFieldChangeHandler;
  onCanBeDamagedChange: CategoryFormFieldChangeHandler;
  onHasConditionPhotosChange: CategoryFormFieldChangeHandler;
}
