import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";

export const resolveCategoryUpdateResult = (
  wasUpdated: boolean,
  notFoundMessage: string
): CategoryMutationResult =>
  wasUpdated
    ? { status: CATEGORY_MUTATION_STATUS.SUCCESS }
    : {
        status: CATEGORY_MUTATION_STATUS.ERROR,
        message: notFoundMessage,
      };
