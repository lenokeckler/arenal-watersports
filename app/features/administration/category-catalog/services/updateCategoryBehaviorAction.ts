"use server";

import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { mapUpdateCategoryBehaviorInputToRow } from "../utils/mapUpdateCategoryBehaviorInputToRow";
import { resolveCategoryUpdateResult } from "../utils/resolveCategoryUpdateResult";
import { updateCategoryRow } from "./updateCategoryRow";

export const updateCategoryBehaviorAction = async (
  input: UpdateCategoryBehaviorInput
): Promise<CategoryMutationResult> =>
  resolveCategoryUpdateResult(
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
