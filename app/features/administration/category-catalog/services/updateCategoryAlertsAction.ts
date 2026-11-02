"use server";

import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";
import { mapUpdateCategoryAlertsInputToRow } from "../utils/mapUpdateCategoryAlertsInputToRow";
import { resolveCategoryUpdateResult } from "../utils/resolveCategoryUpdateResult";
import { updateCategoryRow } from "./updateCategoryRow";

export const updateCategoryAlertsAction = async (
  input: UpdateCategoryAlertsInput
): Promise<CategoryMutationResult> =>
  resolveCategoryUpdateResult(
    await updateCategoryRow({
      categoryId: input.categoryId,
      buildRow: (adminWorkerId) =>
        mapUpdateCategoryAlertsInputToRow(
          input,
          adminWorkerId
        ),
      operation: "updateCategoryAlertsAction",
    }),
    CATEGORY_CATALOG_COPY.ALERT_CATEGORY_NOT_FOUND_ERROR
  );
