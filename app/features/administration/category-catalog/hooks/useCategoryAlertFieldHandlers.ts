import type { CategoryAlertType } from "../constants/CategoryAlertType.constants";
import type { CategoryAlertFieldHandlers } from "../models/CategoryAlertFieldHandlers.interface";
import type { CategoryAlertFieldHandlersOptions } from "../models/CategoryAlertFieldHandlersOptions.interface";
import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import type { CategoryFormFieldChangeHandler } from "../models/CategoryFormFieldChangeHandler.type";

export const useCategoryAlertFieldHandlers = ({
  setValues,
  clearErrors,
}: CategoryAlertFieldHandlersOptions): CategoryAlertFieldHandlers => {
  const buildTextChangeHandler =
    (
      field: keyof CategoryAlertFormErrors
    ): CategoryFormFieldChangeHandler =>
    (event) => {
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
    onAlertTypeChange,
    onMinQuantityChange: buildTextChangeHandler(
      "minQuantityText"
    ),
    onExpiryDaysChange: buildTextChangeHandler(
      "expiryDaysText"
    ),
  };
};
