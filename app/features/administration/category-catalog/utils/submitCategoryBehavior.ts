import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { SubmitCategoryBehaviorOptions } from "../models/SubmitCategoryBehaviorOptions.interface";
import { updateCategoryBehaviorAction } from "../services/updateCategoryBehaviorAction";
import { mapCategoryBehaviorFormValuesToInput } from "./mapCategoryBehaviorFormValuesToInput";
import { resolveCategoryMutationFeedback } from "./resolveCategoryMutationFeedback";
import { showGenericMutationErrorToast } from "./showGenericMutationErrorToast";

export const submitCategoryBehavior = async ({
  categoryId,
  values,
  showToast,
  onSaved,
}: SubmitCategoryBehaviorOptions): Promise<void> => {
  try {
    const result = await updateCategoryBehaviorAction(
      mapCategoryBehaviorFormValuesToInput(
        categoryId,
        values
      )
    );
    const feedback = resolveCategoryMutationFeedback(
      result,
      CATEGORY_CATALOG_COPY.BEHAVIOR_UPDATE_SUCCESS_TOAST
    );
    showToast(feedback.status, feedback.message);

    if (feedback.status === STATUS.SUCCESS) {
      onSaved();
    }
  } catch (error) {
    unstable_rethrow(error);
    showGenericMutationErrorToast(showToast);
  }
};
