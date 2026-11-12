import type { CategoryAlertType } from "../constants/CategoryAlertType.constants";

export interface CategoryAlertFormFieldCase {
  alertType: CategoryAlertType;
  showsQuantity: boolean;
  showsExpiry: boolean;
}
