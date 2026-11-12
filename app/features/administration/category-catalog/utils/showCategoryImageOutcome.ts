import { STATUS } from "@/app/constants";
import type { useToast } from "@/app/components/toast/utils/useToast";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import type { CategoryImageSaveOutcome } from "../models/CategoryImageSaveOutcome.interface";

export const showCategoryImageOutcome = (
  showToast: ReturnType<typeof useToast>["showToast"],
  outcome: CategoryImageSaveOutcome
): void => {
  showToast(outcome.status, outcome.message);

  if (outcome.hasLeftoverObject) {
    showToast(
      STATUS.WARNING,
      CATEGORY_IMAGE_COPY.LEFTOVER_OBJECT_WARNING_TOAST
    );
  }
};
