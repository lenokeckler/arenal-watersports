import type { CategoryConfigurationErrors } from "./CategoryConfigurationErrors.interface";

export interface CategoryConfigurationValidation {
  errors: CategoryConfigurationErrors;
  invalidFieldCount: number;
  isValid: boolean;
}
