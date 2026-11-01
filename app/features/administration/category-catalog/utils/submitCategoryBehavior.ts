import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import type { SubmitCategoryBehaviorOptions } from "../models/SubmitCategoryBehaviorOptions.interface";
import { updateCategoryBehaviorAction } from "../services/updateCategoryBehaviorAction";
import { mapCategoryBehaviorFormValuesToInput } from "./mapCategoryBehaviorFormValuesToInput";
import { resolveUpdateCategoryBehaviorFeedback } from "./resolveUpdateCategoryBehaviorFeedback";
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
    const feedback =
      resolveUpdateCategoryBehaviorFeedback(result);
    showToast(feedback.status, feedback.message);

    if (feedback.status === STATUS.SUCCESS) {
      onSaved();
    }
  } catch (error) {
    unstable_rethrow(error);
    showGenericMutationErrorToast(showToast);
  }
};
