import type { CategoryConfigurationStep } from "../constants/CategoryConfigurationStep.constants";
import type { CategoryConfigurationValidation } from "./CategoryConfigurationValidation.interface";
import type { CategoryMutationFeedback } from "./CategoryMutationFeedback.interface";

export interface CategoryConfigurationSaveOutcome {
  validation: CategoryConfigurationValidation;
  steps: Partial<
    Record<
      CategoryConfigurationStep,
      CategoryMutationFeedback
    >
  >;
}
