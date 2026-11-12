import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import type { CategoryMutationFeedback } from "../models/CategoryMutationFeedback.interface";
import { updateCategoryAlertsAction } from "../services/updateCategoryAlertsAction";
import { mapCategoryAlertFormValuesToInput } from "./mapCategoryAlertFormValuesToInput";
import { resolveCategoryMutationFeedback } from "./resolveCategoryMutationFeedback";

export const saveCategoryAlerts = async (
  categoryId: string,
  values: CategoryAlertFormValues
): Promise<CategoryMutationFeedback> => {
  const result = await updateCategoryAlertsAction(
    mapCategoryAlertFormValuesToInput(categoryId, values)
  );

  return resolveCategoryMutationFeedback(
    result,
    CATEGORY_CATALOG_COPY.ALERT_UPDATE_SUCCESS_TOAST
  );
};
