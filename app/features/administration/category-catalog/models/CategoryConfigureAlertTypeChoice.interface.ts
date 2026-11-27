import type { CategoryAlertType } from "../constants/CategoryAlertType.constants";

export interface CategoryConfigureAlertTypeChoice {
  type: CategoryAlertType;
  label: string;
  isSelected: boolean;
}
