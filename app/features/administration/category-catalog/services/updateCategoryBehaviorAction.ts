"use server";

import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { LOW_FUEL_LINES_DATABASE_ERROR } from "../constants/CategoryBehaviorValidation.constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { mapUpdateCategoryBehaviorInputToRow } from "../utils/mapUpdateCategoryBehaviorInputToRow";
import { resolveCategoryUpdateResult } from "../utils/resolveCategoryUpdateResult";
import { updateCategoryRow } from "./updateCategoryRow";

const isLowFuelTooHighError = (error: unknown): boolean =>
  error instanceof SupabaseQueryError &&
  error.message.includes(
    LOW_FUEL_LINES_DATABASE_ERROR.TOO_HIGH_MESSAGE
  );

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
