import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import { EXTRA_FORM_SUCCESS_TOAST } from "../constants/ExtraFormModeCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { SubmitExtraFormOptions } from "../models/SubmitExtraFormOptions.type";
import { saveExtra } from "./saveExtra";
import { showExtraGenericErrorToast } from "./showExtraGenericErrorToast";

export const submitExtraForm = async ({
  showErrors,
  showToast,
  onSaved,
  ...saveOptions
}: SubmitExtraFormOptions): Promise<void> => {
  try {
    const result = await saveExtra(saveOptions);

    if (result.nameError || result.priceErrors) {
      showErrors({
        name: result.nameError,
        ...result.priceErrors,
      });
      return;
    }

    if (result.status === EXTRA_MUTATION_STATUS.ERROR) {
      showExtraGenericErrorToast(showToast, result.message);
      return;
    }

    showToast(
      STATUS.SUCCESS,
      EXTRA_FORM_SUCCESS_TOAST[saveOptions.mode]
    );
    onSaved();
  } catch (error) {
    unstable_rethrow(error);
    showExtraGenericErrorToast(showToast);
  }
};
