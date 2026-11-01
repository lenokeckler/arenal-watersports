import { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryBehaviorFieldHandlers {
  onCanBeDamagedChange: CategoryFormFieldChangeHandler;
  onConsumesFuelChange: CategoryFormFieldChangeHandler;
  onDefaultDurationMinutesChange: CategoryFormFieldChangeHandler;
  onGuideOnlyChange: CategoryFormFieldChangeHandler;
  onHasConditionPhotosChange: CategoryFormFieldChangeHandler;
  onHasMotorChange: CategoryFormFieldChangeHandler;
  onIsReservableChange: CategoryFormFieldChangeHandler;
  onUnitsAreInterchangeableChange: CategoryFormFieldChangeHandler;
  onUsageMetricChange: CategoryFormFieldChangeHandler;
}
