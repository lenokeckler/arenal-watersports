import type { CategoryAlertFormErrors } from "./CategoryAlertFormErrors.interface";
import type { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";
import type { CategoryConfigureAlertTypeChipsProps } from "./CategoryConfigureAlertTypeChipsProps.interface";
import type { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryConfigureAlertsProps {
  values: CategoryAlertFormValues;
  errors: CategoryAlertFormErrors;
  typeChips: CategoryConfigureAlertTypeChipsProps;
  isQuantityVisible: boolean;
  isExpiryVisible: boolean;
  onMinQuantityChange: CategoryFormFieldChangeHandler;
  onExpiryDaysChange: CategoryFormFieldChangeHandler;
}
