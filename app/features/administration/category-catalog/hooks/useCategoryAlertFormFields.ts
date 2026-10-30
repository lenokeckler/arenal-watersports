"use client";

import { useState } from "react";
import type { CategoryAlertType } from "../constants/CategoryAlertType.constants";
import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import type { CategoryAlertFormFieldsViewModel } from "../models/CategoryAlertFormFieldsViewModel.interface";
import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import type { CategoryAlertFormViewModelProps } from "../models/CategoryAlertFormViewModelProps.interface";
import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";
import type { CategoryFormFieldChangeHandler } from "../models/CategoryFormFieldChangeHandler.type";
import { mapCategoryAlertsToFormValues } from "../utils/mapCategoryAlertsToFormValues";

type CategoryAlertTextField = keyof CategoryAlertFormErrors;

export const useCategoryAlertFormFields = ({
  alerts,
}: CategoryAlertFormViewModelProps): CategoryAlertFormFieldsViewModel => {
  const [values, setValues] =
    useState<CategoryAlertFormValues>(() =>
      mapCategoryAlertsToFormValues(alerts)
    );
  const [errors, setErrors] =
    useState<CategoryAlertFormErrors>({});

  const clearErrors = (
    fields: CategoryAlertTextField[]
  ): void => {
    setErrors((currentErrors) => {
      if (
        fields.every(
          (field) => currentErrors[field] === undefined
        )
      ) {
        return currentErrors;
      }

      const remainingErrors = { ...currentErrors };
      fields.forEach((field) => {
        delete remainingErrors[field];
      });
      return remainingErrors;
    });
  };

  const buildTextChangeHandler =
    (
      field: CategoryAlertTextField
    ): CategoryFormFieldChangeHandler =>
    (event: CategoryFormFieldChangeEvent): void => {
      const fieldValue = event.target.value;
      setValues((currentValues) => ({
        ...currentValues,
        [field]: fieldValue,
      }));
      clearErrors([field]);
    };

  const onAlertTypeChange: CategoryFormFieldChangeHandler =
    (event) => {
      const alertType = event.target
        .value as CategoryAlertType;
      setValues((currentValues) => ({
        ...currentValues,
        alertType,
      }));
      clearErrors(["minQuantityText", "expiryDaysText"]);
    };

  return {
    values,
    errors,
    onAlertTypeChange,
    onMinQuantityChange: buildTextChangeHandler(
      "minQuantityText"
    ),
    onExpiryDaysChange: buildTextChangeHandler(
      "expiryDaysText"
    ),
    showValidationErrors: setErrors,
  };
};
