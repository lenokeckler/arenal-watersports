import type { CategoryConfigurationSaveOutcome } from "./CategoryConfigurationSaveOutcome.interface";
import type { CategoryConfigureDraftComparison } from "./CategoryConfigureDraftComparison.interface";

export interface ApplySavedCategoryStepsOptions extends CategoryConfigureDraftComparison {
  steps: CategoryConfigurationSaveOutcome["steps"];
}
