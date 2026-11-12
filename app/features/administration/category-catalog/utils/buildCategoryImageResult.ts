import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryImageMutationResult } from "../models/CategoryImageMutationResult.type";

export const buildCategoryImageSuccess = (
  hasLeftoverObject: boolean
): CategoryImageMutationResult => ({
  status: CATEGORY_MUTATION_STATUS.SUCCESS,
  hasLeftoverObject,
});

export const buildCategoryImageError = (
  message: string
): CategoryImageMutationResult => ({
  status: CATEGORY_MUTATION_STATUS.ERROR,
  message,
});
