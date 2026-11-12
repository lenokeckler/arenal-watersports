import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import type { SubmitCategoryAlertsOptions } from "../models/SubmitCategoryAlertsOptions.interface";
import { saveCategoryAlerts } from "./saveCategoryAlerts";
import { showGenericMutationErrorToast } from "./showGenericMutationErrorToast";

export const submitCategoryAlerts = async ({
  categoryId,
  values,
  showToast,
  onSaved,
}: SubmitCategoryAlertsOptions): Promise<void> => {
  try {
    const feedback = await saveCategoryAlerts(
      categoryId,
      values
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
