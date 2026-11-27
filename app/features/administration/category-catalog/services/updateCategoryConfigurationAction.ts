"use server";

import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import type { UpdateCategoryConfigurationInput } from "../models/UpdateCategoryConfigurationInput.interface";
import { isLowFuelTooHighError } from "../utils/isLowFuelTooHighError";
import { mapUpdateCategoryAlertsInputToRow } from "../utils/mapUpdateCategoryAlertsInputToRow";
import { mapUpdateCategoryBehaviorInputToRow } from "../utils/mapUpdateCategoryBehaviorInputToRow";
import { mapUpdateCategoryDepositInputToRow } from "../utils/mapUpdateCategoryDepositInputToRow";
import { resolveCategoryUpdateResult } from "../utils/resolveCategoryUpdateResult";
import { updateCategoryRow } from "./updateCategoryRow";

export const updateCategoryConfigurationAction = async (
  input: UpdateCategoryConfigurationInput
): Promise<CategoryMutationResult> => {
  try {
    return resolveCategoryUpdateResult(
      await updateCategoryRow({
        categoryId: input.categoryId,
        buildRow: (adminWorkerId) => ({
          ...mapUpdateCategoryBehaviorInputToRow(
            input.behavior,
            adminWorkerId
          ),
          ...mapUpdateCategoryDepositInputToRow(
            input.deposit,
            adminWorkerId
          ),
          ...mapUpdateCategoryAlertsInputToRow(
            input.alerts,
            adminWorkerId
          ),
        }),
        operation: "updateCategoryConfigurationAction",
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
