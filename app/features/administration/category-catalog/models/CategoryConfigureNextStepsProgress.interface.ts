import type { CategoryConfigureNextStep } from "./CategoryConfigureNextStep.interface";

export interface CategoryConfigureNextStepsProgress {
  steps: CategoryConfigureNextStep[];
  doneCount: number;
  requiredCount: number;
}
