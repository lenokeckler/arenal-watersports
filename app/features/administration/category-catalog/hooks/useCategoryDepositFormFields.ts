"use client";

import { useState } from "react";
import type { CategoryDepositFormErrors } from "../models/CategoryDepositFormErrors.interface";
import type { CategoryDepositFormFieldsViewModel } from "../models/CategoryDepositFormFieldsViewModel.interface";
import type { CategoryDepositFormValues } from "../models/CategoryDepositFormValues.interface";
import type { CategoryDepositFormViewModelProps } from "../models/CategoryDepositFormViewModelProps.interface";
import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";
import type { CategoryFormFieldChangeHandler } from "../models/CategoryFormFieldChangeHandler.type";
import { mapCategoryDepositToFormValues } from "../utils/mapCategoryDepositToFormValues";

export const useCategoryDepositFormFields = ({
  deposit,
}: CategoryDepositFormViewModelProps): CategoryDepositFormFieldsViewModel => {
  const [values, setValues] =
    useState<CategoryDepositFormValues>(() =>
      mapCategoryDepositToFormValues(deposit)
    );
  const [errors, setErrors] =
    useState<CategoryDepositFormErrors>({});

  const buildChangeHandler =
    (
      field: keyof CategoryDepositFormValues
    ): CategoryFormFieldChangeHandler =>
    (event: CategoryFormFieldChangeEvent): void => {
      const fieldValue = event.target.value;
      setValues((currentValues) => ({
        ...currentValues,
        [field]: fieldValue,
      }));
      setErrors((currentErrors) => {
        if (currentErrors[field] === undefined) {
          return currentErrors;
        }

        const remainingErrors = { ...currentErrors };
        delete remainingErrors[field];
        return remainingErrors;
      });
    };

  return {
    values,
    errors,
    onDepositCrcChange: buildChangeHandler("depositCrc"),
    onDepositUsdChange: buildChangeHandler("depositUsd"),
    showValidationErrors: setErrors,
  };
};
