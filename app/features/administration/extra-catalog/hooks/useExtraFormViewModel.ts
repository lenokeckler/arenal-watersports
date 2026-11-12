"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import { EXTRA_INPUT_FIELD } from "../constants/ExtraInputField.constants";
import { EXTRA_FORM_INITIAL_VALUES } from "../constants/ExtraFormInitialValues.constants";
import type { ExtraFormErrors } from "../models/ExtraFormErrors.interface";
import type { ExtraFormFieldChangeHandler } from "../models/ExtraFormFieldChangeHandler.type";
import type { ExtraFormValues } from "../models/ExtraFormValues.interface";
import type { ExtraFormViewModel } from "../models/ExtraFormViewModel.interface";
import type { ExtraFormViewModelProps } from "../models/ExtraFormViewModelProps.type";
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

  const { isSubmitting, onSubmit } = useExtraFormSubmit({
    ...props,
    values,
    showErrors: setErrors,
  });

  const buildChangeHandler =
    (
      field: keyof ExtraFormValues
    ): ExtraFormFieldChangeHandler =>
    (event) => {
      const fieldValue = event.target.value;
      setValues((currentValues) => ({
        ...currentValues,
        [field]: fieldValue,
      }));
      setErrors({});
    };

  const onBack = (): void => {
    router.push(PATHS.ADMINISTRATION.EXTRAS);
  };

  return {
    values,
    errors,
    isSubmitting,
    onNameChange: buildChangeHandler(
      EXTRA_INPUT_FIELD.NAME
    ),
    onPriceUsdChange: buildChangeHandler(
      EXTRA_INPUT_FIELD.PRICE_USD
    ),
    onPriceCrcChange: buildChangeHandler(
      EXTRA_INPUT_FIELD.PRICE_CRC
    ),
    onBack,
    onSubmit,
  };
};
