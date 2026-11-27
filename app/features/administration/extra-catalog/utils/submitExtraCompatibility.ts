import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { SubmitExtraCompatibilityOptions } from "../models/SubmitExtraCompatibilityOptions.interface";
import { setExtraCompatibilityAction } from "../services/setExtraCompatibilityAction";

export const submitExtraCompatibility = async ({
  input,
  onSaved,
  showToast,
}: SubmitExtraCompatibilityOptions): Promise<void> => {
  if (!navigator.onLine) {
    showToast(
      STATUS.ERROR,
      EXTRA_COMPATIBILITY_COPY.OFFLINE_ERROR
    );
    return;
  }

  try {
    const result = await setExtraCompatibilityAction(input);

    if (result.status === EXTRA_MUTATION_STATUS.ERROR) {
      showToast(
        STATUS.ERROR,
        result.message ??
          EXTRA_COMPATIBILITY_COPY.SAVE_ERROR
      );
      return;
    }

    showToast(
      STATUS.SUCCESS,
      EXTRA_COMPATIBILITY_COPY.SAVE_SUCCESS_TOAST
    );
    onSaved();
  } catch (error) {
    unstable_rethrow(error);
    showToast(
      STATUS.ERROR,
      EXTRA_COMPATIBILITY_COPY.SAVE_ERROR
    );
  }
};
