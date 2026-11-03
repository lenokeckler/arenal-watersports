"use client";

import { useState } from "react";
import type { UnitStatus } from "../constants/UnitStatus.constants";
import type { UnitFormErrors } from "../models/UnitFormErrors.interface";
import type { UnitFormFieldChangeHandler } from "../models/UnitFormFieldChangeHandler.type";
import type { UnitFormFieldsProps } from "../models/UnitFormFieldsProps.interface";
import type { UnitFormFieldsViewModel } from "../models/UnitFormFieldsViewModel.interface";
import type { UnitFormValues } from "../models/UnitFormValues.interface";

type UnitTextField = Exclude<
  keyof UnitFormValues,
  "status"
>;

export const useUnitFormFields = ({
  initialValues,
}: UnitFormFieldsProps): UnitFormFieldsViewModel => {
  const [values, setValues] =
    useState<UnitFormValues>(initialValues);
  const [errors, setErrors] = useState<UnitFormErrors>({});

  const clearError = (
    field: keyof UnitFormErrors
  ): void => {
    setErrors((currentErrors) => {
      if (currentErrors[field] === undefined) {
        return currentErrors;
      }

      const remainingErrors = { ...currentErrors };
      delete remainingErrors[field];
      return remainingErrors;
    });
  };

  const buildTextChangeHandler =
    (field: UnitTextField): UnitFormFieldChangeHandler =>
    (event) => {
      const fieldValue = event.target.value;
      setValues((currentValues) => ({
        ...currentValues,
        [field]: fieldValue,
      }));
      clearError(field);
    };

  const onStatusChange: UnitFormFieldChangeHandler = (
    event
  ) => {
    const status = event.target.value as UnitStatus;
    setValues((currentValues) => ({
      ...currentValues,
      status,
    }));
    clearError("status");
  };

  const setCodeError = (message: string): void => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      code: message,
    }));
  };

  return {
    values,
    errors,
    onCodeChange: buildTextChangeHandler("code"),
    onStatusChange,
    onFuelMaxChange: buildTextChangeHandler("fuelMax"),
    onFuelLevelChange: buildTextChangeHandler("fuelLevel"),
    onUsageTotalChange:
      buildTextChangeHandler("usageTotal"),
    onNextOilChangeAtChange: buildTextChangeHandler(
      "nextOilChangeAt"
    ),
    showValidationErrors: setErrors,
    setCodeError,
  };
};
