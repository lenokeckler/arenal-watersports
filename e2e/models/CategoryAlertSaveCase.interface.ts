import type { CategoryAlertType } from "@/app/features/administration/category-catalog/constants/CategoryAlertType.constants";
import type { CategoryAlertThresholdInput } from "./CategoryAlertThresholdInput.interface";
import type { CategoryAlertThresholds } from "./CategoryAlertThresholds.interface";

export interface CategoryAlertSaveCase {
  alertType: CategoryAlertType;
  expected: CategoryAlertThresholds;
  input: CategoryAlertThresholdInput;
  scenario: string;
  seeded: CategoryAlertThresholds;
}
