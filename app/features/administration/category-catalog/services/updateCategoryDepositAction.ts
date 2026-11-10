"use server";

import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import type { UpdateCategoryDepositInput } from "../models/UpdateCategoryDepositInput.interface";
import { mapUpdateCategoryDepositInputToRow } from "../utils/mapUpdateCategoryDepositInputToRow";
import { resolveCategoryUpdateResult } from "../utils/resolveCategoryUpdateResult";
import { updateCategoryRow } from "./updateCategoryRow";

export const updateCategoryDepositAction = async (
  input: UpdateCategoryDepositInput
): Promise<CategoryMutationResult> =>
  resolveCategoryUpdateResult(
    await updateCategoryRow({
      categoryId: input.categoryId,
      buildRow: (adminWorkerId) =>
        mapUpdateCategoryDepositInputToRow(
          input,
          adminWorkerId
        ),
      operation: "updateCategoryDepositAction",
    }),
    CATEGORY_CATALOG_COPY.DEPOSIT_CATEGORY_NOT_FOUND_ERROR
  );
