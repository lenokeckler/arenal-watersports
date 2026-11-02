import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryDepositFormValues } from "../models/CategoryDepositFormValues.interface";
import type { CategoryMutationFeedback } from "../models/CategoryMutationFeedback.interface";
import { updateCategoryDepositAction } from "../services/updateCategoryDepositAction";
import { mapCategoryDepositFormValuesToInput } from "./mapCategoryDepositFormValuesToInput";
import { resolveCategoryMutationFeedback } from "./resolveCategoryMutationFeedback";

export const saveCategoryDeposit = async (
  categoryId: string,
  values: CategoryDepositFormValues
): Promise<CategoryMutationFeedback> => {
  const result = await updateCategoryDepositAction(
    mapCategoryDepositFormValuesToInput(categoryId, values)
  );

  return resolveCategoryMutationFeedback(
    result,
    CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST
  );
};
