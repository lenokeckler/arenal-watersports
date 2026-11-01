import { STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryMutationFeedback } from "../models/CategoryMutationFeedback.interface";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";

export const resolveCategoryMutationFeedback = (
  result: CategoryMutationResult,
  successMessage: string
): CategoryMutationFeedback => {
  if (result.status === CATEGORY_MUTATION_STATUS.SUCCESS) {
    return {
      status: STATUS.SUCCESS,
      message: successMessage,
    };
  }

  if (result.message) {
    return {
      status: STATUS.ERROR,
      message: result.message,
    };
  }

  return {
    status: STATUS.ERROR,
    message: CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR,
  };
};
