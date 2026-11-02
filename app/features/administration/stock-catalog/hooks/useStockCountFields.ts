"use client";

import { useState } from "react";
import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
import type { StockQuantityField } from "../constants/StockQuantityField.constants";
import type { StockCountFieldsProps } from "../models/StockCountFieldsProps.interface";
import type { StockCountFieldsViewModel } from "../models/StockCountFieldsViewModel.interface";
import type { StockFormErrors } from "../models/StockFormErrors.interface";
import type { StockFormFieldChangeHandler } from "../models/StockFormFieldChangeHandler.type";
import type { StockFormValues } from "../models/StockFormValues.interface";
import type { StockTextField } from "../models/StockTextField.type";
import { clearStockFormErrors } from "../utils/clearStockFormErrors";
import { hasRegisteredStockCount } from "../utils/hasRegisteredStockCount";
import { mapStockLevelsToFormValues } from "../utils/mapStockLevelsToFormValues";
import { resolveStockDefaultReason } from "../utils/resolveStockDefaultReason";
import { stepStockQuantity } from "../utils/stepStockQuantity";

export const useStockCountFields = ({
  hasHistory,
  levels,
}: StockCountFieldsProps): StockCountFieldsViewModel => {
  const [values, setValues] = useState<StockFormValues>(
    () =>
      mapStockLevelsToFormValues(
        levels,
        resolveStockDefaultReason(
          hasRegisteredStockCount(levels, hasHistory)
        )
      )
  );
  const [errors, setErrors] = useState<StockFormErrors>({});

  const clearError = (
    field: keyof StockFormErrors
  ): void => {
    setErrors((currentErrors) =>
      clearStockFormErrors(currentErrors, field)
    );
  };

  const buildTextChangeHandler =
    (field: StockTextField): StockFormFieldChangeHandler =>
    (event) => {
      const fieldValue = event.target.value;
      setValues((currentValues) => ({
        ...currentValues,
        [field]: fieldValue,
      }));
      clearError(field);
    };

  const onQuantityStep = (
    field: StockQuantityField,
    step: number
  ): void => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: stepStockQuantity(
        currentValues[field],
        step
      ),
    }));
    clearError(field);
  };

  const onReasonChange: StockFormFieldChangeHandler = (
    event
  ) => {
    const reason = event.target
      .value as StockFormValues["reason"];
    setValues((currentValues) => ({
      ...currentValues,
      reason,
    }));
    clearError("form");
  };

  const markSaved = (): void => {
    setValues((currentValues) => ({
      ...currentValues,
      reason: STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION,
    }));
  };

  return {
    errors,
    handlers: {
      onAvailableChange:
        buildTextChangeHandler("available"),
      onDamagedChange: buildTextChangeHandler("damaged"),
      onExpiryDateChange:
        buildTextChangeHandler("expiryDate"),
      onInRepairChange: buildTextChangeHandler("inRepair"),
      onQuantityStep,
      onReasonChange,
    },
    markSaved,
    showValidationErrors: setErrors,
    values,
  };
};
