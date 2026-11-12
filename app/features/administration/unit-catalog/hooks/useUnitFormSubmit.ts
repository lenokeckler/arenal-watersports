"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { UNIT_FORM_MODE } from "../constants/UnitFormMode.constants";
import type { UnitFormSubmitOptions } from "../models/UnitFormSubmitOptions.interface";
import type { UnitFormSubmitViewModel } from "../models/UnitFormSubmitViewModel.interface";
import { reportUnitFormErrors } from "../utils/reportUnitFormErrors";
import { resolveCategoryUnitsPath } from "../utils/resolveUnitPaths";
import { submitUnitForm } from "../utils/submitUnitForm";

export const useUnitFormSubmit = ({
  onValidationErrors,
  ...submitOptions
}: UnitFormSubmitOptions): UnitFormSubmitViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();
  const { mode, categoryId, hasMotor, values } =
    submitOptions;

  const onSaved = (): void => {
    if (mode === UNIT_FORM_MODE.CREATE) {
      router.push(resolveCategoryUnitsPath(categoryId));
      return;
    }
    router.refresh();
  };

  const onSubmit = async (
    event: FormSubmitEvent
  ): Promise<void> => {
    event.preventDefault();

    if (
      reportUnitFormErrors(
        values,
        { hasMotor },
        onValidationErrors
      )
    ) {
      return;
    }

    await runLocked(() =>
      submitUnitForm({
        ...submitOptions,
        showToast,
        onSaved,
      })
    );
  };

  return { isSubmitting, onSubmit };
};
