"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import { EXTRA_FORM_INITIAL_VALUES } from "../constants/ExtraFormInitialValues.constants";
import type { ExtraFormErrors } from "../models/ExtraFormErrors.interface";
import type { ExtraFormFieldChangeHandler } from "../models/ExtraFormFieldChangeHandler.type";
import type { ExtraFormValues } from "../models/ExtraFormValues.interface";
import type { ExtraFormViewModel } from "../models/ExtraFormViewModel.interface";
import type { ExtraFormViewModelProps } from "../models/ExtraFormViewModelProps.type";
import type { SetNameError } from "../models/SetNameError.type";
import { mapExtraToFormValues } from "../utils/mapExtraToFormValues";
import { useExtraFormSubmit } from "./useExtraFormSubmit";

export const useExtraFormViewModel = (
  props: ExtraFormViewModelProps
): ExtraFormViewModel => {
  const router = useRouter();
  const [values, setValues] = useState<ExtraFormValues>(
    props.mode === EXTRA_FORM_MODE.EDIT
      ? mapExtraToFormValues(props.extra)
      : EXTRA_FORM_INITIAL_VALUES
  );
  const [errors, setErrors] = useState<ExtraFormErrors>({});

  const setNameError: SetNameError = (message) =>
    setErrors({ name: message });

  const { isSubmitting, onSubmit } = useExtraFormSubmit({
    ...props,
    values,
    setNameError,
  });

  const onNameChange: ExtraFormFieldChangeHandler = (
    event
  ) => {
    setValues({ name: event.target.value });
    setErrors({});
  };

  const onBack = (): void => {
    router.push(PATHS.ADMINISTRATION.EXTRAS);
  };

  return {
    values,
    errors,
    isSubmitting,
    onNameChange,
    onBack,
    onSubmit,
  };
};
