import type { CategoryAlertType } from "../constants/CategoryAlertType.constants";

export interface CategoryAlertFormValues {
  alertType: CategoryAlertType;
  minQuantityText: string;
  expiryDaysText: string;
}
