import type { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";
import type { CategoryBehaviorFormValues } from "./CategoryBehaviorFormValues.interface";
import type { CategoryDepositFormValues } from "./CategoryDepositFormValues.interface";

export interface CategoryEditedValues {
  behavior: CategoryBehaviorFormValues;
  deposit: CategoryDepositFormValues;
  alerts: CategoryAlertFormValues;
}
