"use server";

import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { isLowFuelTooHighError } from "../utils/isLowFuelTooHighError";
import { mapUpdateCategoryBehaviorInputToRow } from "../utils/mapUpdateCategoryBehaviorInputToRow";
import { resolveCategoryUpdateResult } from "../utils/resolveCategoryUpdateResult";
import { updateCategoryRow } from "./updateCategoryRow";

export const updateCategoryBehaviorAction = async (
  input: UpdateCategoryBehaviorInput
): Promise<CategoryMutationResult> => {
  try {
    return resolveCategoryUpdateResult(
      await updateCategoryRow({
        categoryId: input.categoryId,
        buildRow: (adminWorkerId) =>
          mapUpdateCategoryBehaviorInputToRow(
            input,
            adminWorkerId
          ),
        operation: "updateCategoryBehaviorAction",
      }),
      CATEGORY_CATALOG_COPY.BEHAVIOR_CATEGORY_NOT_FOUND_ERROR
    );
  } catch (error) {
    if (isLowFuelTooHighError(error)) {
      return {
        status: CATEGORY_MUTATION_STATUS.ERROR,
        message:
          CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_TOO_HIGH_ERROR,
      };
    }

    throw error;
  }
};
