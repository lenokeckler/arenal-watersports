import type { CategoryMutationFeedback } from "./CategoryMutationFeedback.interface";

export interface CategoryImageSaveOutcome extends CategoryMutationFeedback {
  hasLeftoverObject: boolean;
}
