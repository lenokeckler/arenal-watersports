"use client";

import { useState } from "react";
import {
  unstable_rethrow,
  useRouter,
} from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import { PATHS, STATUS, STRING } from "@/app/constants";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { NO_COMBO_FORM_ERRORS } from "../constants/ComboFormDefaults.constants";
import type { ComboFormSubmitOptions } from "../models/ComboFormSubmitOptions.interface";
import type { ComboFormSubmitViewModel } from "../models/ComboFormSubmitViewModel.interface";
import { saveComboAction } from "../services/saveComboAction";
import { mapComboFormValuesToPayload } from "../utils/mapComboFormValuesToPayload";
import { validateComboFormValues } from "../utils/validateComboFormValues";

export const useComboFormSubmit = ({
  comboId,
  values,
}: ComboFormSubmitOptions): ComboFormSubmitViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>(
    STRING.Empty
  );
  const currentErrors = validateComboFormValues(values);

  const saveCombo = async (): Promise<void> => {
    setSubmitError(STRING.Empty);
    try {
      const result = await saveComboAction(
        mapComboFormValuesToPayload(values, comboId)
      );
      if (result.status === STATUS.ERROR) {
        setSubmitError(
          result.message ??
            COMBO_FORM_COPY.SAVE_GENERIC_ERROR
        );
        return;
      }
      showToast(
        STATUS.SUCCESS,
        COMBO_FORM_COPY.SAVE_SUCCESS_TOAST
      );
      router.push(PATHS.ADMINISTRATION.COMBOS);
      router.refresh();
    } catch (error) {
      unstable_rethrow(error);
      setSubmitError(COMBO_FORM_COPY.SAVE_GENERIC_ERROR);
    }
  };

  const onSubmit = async (
    event: FormSubmitEvent
  ): Promise<void> => {
    event.preventDefault();
    setHasSubmitted(true);
    if (currentErrors.count > 0) {
      return;
    }
    await runLocked(saveCombo);
  };

  return {
    errors: hasSubmitted
      ? currentErrors
      : NO_COMBO_FORM_ERRORS,
    isSubmitting,
    onSubmit,
    submitError,
  };
};
