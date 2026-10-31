"use client";

import { useState } from "react";
import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import type { CategoryAlertFormFieldsViewModel } from "../models/CategoryAlertFormFieldsViewModel.interface";
import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import type { CategoryAlertFormViewModelProps } from "../models/CategoryAlertFormViewModelProps.interface";
import { clearCategoryAlertFieldErrors } from "../utils/clearCategoryAlertFieldErrors";
import { mapCategoryAlertsToFormValues } from "../utils/mapCategoryAlertsToFormValues";
import { useCategoryAlertFieldHandlers } from "./useCategoryAlertFieldHandlers";

export const useCategoryAlertFormFields = ({
  alerts,
}: CategoryAlertFormViewModelProps): CategoryAlertFormFieldsViewModel => {
  const [values, setValues] =
    useState<CategoryAlertFormValues>(() =>
      mapCategoryAlertsToFormValues(alerts)
    );
  const [errors, setErrors] =
    useState<CategoryAlertFormErrors>({});

  const handlers = useCategoryAlertFieldHandlers({
    setValues,
    clearErrors: (fields) =>
      setErrors((currentErrors) =>
        clearCategoryAlertFieldErrors(currentErrors, fields)
      ),
  });

  return {
    values,
    errors,
    ...handlers,
    showValidationErrors: setErrors,
  };
};
