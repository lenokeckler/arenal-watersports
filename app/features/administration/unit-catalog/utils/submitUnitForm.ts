import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import { UNIT_FORM_SUCCESS_TOAST } from "../constants/UnitFormModeCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import type { SubmitUnitFormOptions } from "../models/SubmitUnitFormOptions.interface";
import { saveUnit } from "./saveUnit";
import { showUnitGenericErrorToast } from "./showUnitGenericErrorToast";

export const submitUnitForm = async ({
  setCodeError,
  showToast,
  onSaved,
  ...saveOptions
}: SubmitUnitFormOptions): Promise<void> => {
  try {
    const result = await saveUnit(saveOptions);

    if (result.codeError) {
      setCodeError(result.codeError);
      return;
    }

    if (result.status === UNIT_MUTATION_STATUS.ERROR) {
      showUnitGenericErrorToast(showToast, result.message);
      return;
    }

    showToast(
      STATUS.SUCCESS,
      UNIT_FORM_SUCCESS_TOAST[saveOptions.mode]
    );
    onSaved();
  } catch (error) {
    unstable_rethrow(error);
    showUnitGenericErrorToast(showToast);
  }
};
