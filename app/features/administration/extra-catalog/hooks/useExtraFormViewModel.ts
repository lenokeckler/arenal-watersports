"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS, STRING } from "@/app/constants";
import { EXTRA_INPUT_FIELD } from "../constants/ExtraInputField.constants";
import type { ExtraFormErrors } from "../models/ExtraFormErrors.interface";
import type { ExtraFormFieldChangeHandler } from "../models/ExtraFormFieldChangeHandler.type";
import type { ExtraFormValues } from "../models/ExtraFormValues.interface";
import type { ExtraFormViewModel } from "../models/ExtraFormViewModel.interface";
import type { ExtraFormViewModelProps } from "../models/ExtraFormViewModelProps.type";
import { buildExtraOccupancyCategoryOptions } from "../utils/buildExtraOccupancyCategoryOptions";
import { isExtraOccupancyLocked } from "../utils/isExtraOccupancyLocked";
import { readExtraToggleChecked } from "../utils/readExtraToggleChecked";
import { resolveExtraFormInitialValues } from "../utils/resolveExtraFormInitialValues";
import { useExtraFormSubmit } from "./useExtraFormSubmit";

export const useExtraFormViewModel = (
  props: ExtraFormViewModelProps
): ExtraFormViewModel => {
  const router = useRouter();
  const initialValues =
    resolveExtraFormInitialValues(props);
  const [values, setValues] =
    useState<ExtraFormValues>(initialValues);
  const [errors, setErrors] = useState<ExtraFormErrors>({});
  const [isOccupancyEnabled, setIsOccupancyEnabled] =
    useState<boolean>(
      initialValues.occupiesCategoryId !== STRING.Empty
    );

  const { isSubmitting, onSubmit } = useExtraFormSubmit({
    ...props,
    values,
    isOccupancyEnabled,
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

  const onOccupancyToggle: ExtraFormFieldChangeHandler = (
    event
  ) => {
    const isChecked = readExtraToggleChecked(event);
    setIsOccupancyEnabled(isChecked);
    if (!isChecked) {
      setValues((currentValues) => ({
        ...currentValues,
        occupiesCategoryId: STRING.Empty,
        occupiesQuantity: STRING.Empty,
      }));
    }
    setErrors({});
  };

  const onBack = (): void => {
    router.push(PATHS.ADMINISTRATION.EXTRAS);
  };

  const isOccupancyLocked = isExtraOccupancyLocked(props);
  const occupancyCategoryOptions =
    buildExtraOccupancyCategoryOptions(
      props.occupiableCategories
    );

  return {
    values,
    errors,
    isSubmitting,
    isOccupancyEnabled,
    isOccupancyDisabled: isSubmitting || isOccupancyLocked,
    isOccupancyLocked,
    hasOccupiableCategories:
      occupancyCategoryOptions.length > 0,
    occupancyCategoryOptions,
    onNameChange: buildChangeHandler(
      EXTRA_INPUT_FIELD.NAME
    ),
    onPriceUsdChange: buildChangeHandler(
      EXTRA_INPUT_FIELD.PRICE_USD
    ),
    onPriceCrcChange: buildChangeHandler(
      EXTRA_INPUT_FIELD.PRICE_CRC
    ),
    onOccupancyToggle,
    onOccupiesCategoryChange: buildChangeHandler(
      EXTRA_INPUT_FIELD.OCCUPIES_CATEGORY_ID
    ),
    onOccupiesQuantityChange: buildChangeHandler(
      EXTRA_INPUT_FIELD.OCCUPIES_QUANTITY
    ),
    onBack,
    onSubmit,
  };
};
