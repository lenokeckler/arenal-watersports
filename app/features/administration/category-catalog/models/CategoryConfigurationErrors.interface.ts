import type { CategoryAlertFormErrors } from "./CategoryAlertFormErrors.interface";
import type { CategoryBehaviorFormErrors } from "./CategoryBehaviorFormErrors.interface";
import type { CategoryDepositFormErrors } from "./CategoryDepositFormErrors.interface";

export interface CategoryConfigurationErrors {
  behavior: CategoryBehaviorFormErrors;
  deposit: CategoryDepositFormErrors;
  alerts: CategoryAlertFormErrors;
}
