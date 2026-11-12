import type { CategoryAlertIssue } from "@/app/features/administration/category-catalog/constants/CategoryAlertIssue.constants";
import type { CategoryAlertType } from "@/app/features/administration/category-catalog/constants/CategoryAlertType.constants";
import type { CategoryAlertFormErrors } from "@/app/features/administration/category-catalog/models/CategoryAlertFormErrors.interface";
import type { CategoryAlertThresholdInput } from "./CategoryAlertThresholdInput.interface";

export interface CategoryAlertInputCase {
  alertType: CategoryAlertType;
  errorKey: keyof CategoryAlertFormErrors;
  fieldId: string;
  input: CategoryAlertThresholdInput;
  issue: CategoryAlertIssue;
  scenario: string;
}
