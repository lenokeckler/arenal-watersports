import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import type { SubmitCategoryDepositOptions } from "../models/SubmitCategoryDepositOptions.interface";
import { saveCategoryDeposit } from "./saveCategoryDeposit";
import { showGenericMutationErrorToast } from "./showGenericMutationErrorToast";

export const submitCategoryDeposit = async ({
  categoryId,
  values,
  showToast,
  onSaved,
}: SubmitCategoryDepositOptions): Promise<void> => {
  try {
    const feedback = await saveCategoryDeposit(
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
