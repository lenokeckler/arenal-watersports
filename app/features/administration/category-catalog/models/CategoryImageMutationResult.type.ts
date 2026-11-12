import type { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";

export type CategoryImageMutationResult =
  | {
      status: typeof CATEGORY_MUTATION_STATUS.SUCCESS;
      hasLeftoverObject: boolean;
    }
  | {
      status: typeof CATEGORY_MUTATION_STATUS.ERROR;
      message: string;
    };
