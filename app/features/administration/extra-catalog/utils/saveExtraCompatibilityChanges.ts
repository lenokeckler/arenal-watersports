import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { SaveExtraCompatibilityChangesOptions } from "../models/SaveExtraCompatibilityChangesOptions.interface";
import { setExtraCompatibilityAction } from "../services/setExtraCompatibilityAction";

export const saveExtraCompatibilityChanges = async ({
  changes,
  extraId,
  showToast,
}: SaveExtraCompatibilityChangesOptions): Promise<boolean> => {
  if (!navigator.onLine) {
    showToast(
      STATUS.ERROR,
      EXTRA_COMPATIBILITY_COPY.OFFLINE_ERROR
    );
    return false;
  }

  try {
    for (const change of changes) {
      const result = await setExtraCompatibilityAction({
        extraId,
        ...change,
      });

      if (result.status === EXTRA_MUTATION_STATUS.ERROR) {
        showToast(
          STATUS.ERROR,
          result.message ??
            EXTRA_COMPATIBILITY_COPY.SAVE_ERROR
        );
        return false;
      }
    }
  } catch (error) {
    unstable_rethrow(error);
    showToast(
      STATUS.ERROR,
      EXTRA_COMPATIBILITY_COPY.SAVE_ERROR
    );
    return false;
  }

  showToast(
    STATUS.SUCCESS,
    EXTRA_COMPATIBILITY_COPY.SAVE_SUCCESS_TOAST
  );
  return true;
};
