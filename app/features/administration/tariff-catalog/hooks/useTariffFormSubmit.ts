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
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";
import { NO_TARIFF_FORM_ERRORS } from "../constants/TariffFormDefaults.constants";
import type { TariffFormSubmitOptions } from "../models/TariffFormSubmitOptions.interface";
import type { TariffFormSubmitViewModel } from "../models/TariffFormSubmitViewModel.interface";
import { saveTariffsAction } from "../services/saveTariffsAction";
import { mapTariffFormValuesToPayload } from "../utils/mapTariffFormValuesToPayload";
import { validateTariffFormValues } from "../utils/validateTariffFormValues";

export const useTariffFormSubmit = ({
  tariff,
  values,
}: TariffFormSubmitOptions): TariffFormSubmitViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>(
    STRING.Empty
  );
  const currentErrors = validateTariffFormValues(
    values,
    tariff
  );

  const saveTariffs = async (): Promise<void> => {
    setSubmitError(STRING.Empty);
    try {
      const result = await saveTariffsAction(
        mapTariffFormValuesToPayload(
          tariff.categoryId,
          values
        )
      );
      if (result.status === STATUS.ERROR) {
        setSubmitError(
          result.message ??
            TARIFF_FORM_COPY.SAVE_GENERIC_ERROR
        );
        return;
      }
      showToast(
        STATUS.SUCCESS,
        TARIFF_FORM_COPY.SAVE_SUCCESS_TOAST
      );
      router.push(PATHS.ADMINISTRATION.TARIFFS);
      router.refresh();
    } catch (error) {
      unstable_rethrow(error);
      setSubmitError(TARIFF_FORM_COPY.SAVE_GENERIC_ERROR);
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
    await runLocked(saveTariffs);
  };

  return {
    errors: hasSubmitted
      ? currentErrors
      : NO_TARIFF_FORM_ERRORS,
    isSubmitting,
    onSubmit,
    submitError,
  };
};
