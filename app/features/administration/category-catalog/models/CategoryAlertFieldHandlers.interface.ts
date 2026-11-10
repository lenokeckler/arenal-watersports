import { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryAlertFieldHandlers {
  onAlertTypeChange: CategoryFormFieldChangeHandler;
  onMinQuantityChange: CategoryFormFieldChangeHandler;
  onExpiryDaysChange: CategoryFormFieldChangeHandler;
}
