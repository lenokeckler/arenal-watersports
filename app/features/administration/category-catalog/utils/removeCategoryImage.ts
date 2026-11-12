import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryImageSaveOutcome } from "../models/CategoryImageSaveOutcome.interface";
import { removeCategoryImageAction } from "../services/removeCategoryImageAction";
import {
  buildCategoryImageCompletion,
  buildCategoryImageFailure,
} from "./buildCategoryImageOutcome";

export const removeCategoryImage = async (
  categoryId: string
): Promise<CategoryImageSaveOutcome> => {
  if (!navigator.onLine) {
    return buildCategoryImageFailure(
      CATEGORY_IMAGE_COPY.OFFLINE_ERROR
    );
  }

  try {
    const result =
      await removeCategoryImageAction(categoryId);

    return result.status === CATEGORY_MUTATION_STATUS.ERROR
      ? buildCategoryImageFailure(result.message)
      : buildCategoryImageCompletion(
          CATEGORY_IMAGE_COPY.REMOVE_SUCCESS_TOAST,
          result.hasLeftoverObject
        );
  } catch {
    return buildCategoryImageFailure(
      CATEGORY_IMAGE_COPY.REMOVE_ERROR
    );
  }
};
