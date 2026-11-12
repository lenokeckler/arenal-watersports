import type { CustomComboReservationValidation } from "../models/CustomComboReservationValidation.interface";
import type { CustomComboReservationField } from "../models/CustomComboReservationField.constants";

export const addCustomComboReservationError = (
  errors: CustomComboReservationValidation["errors"],
  field: CustomComboReservationField,
  isValid: boolean,
  message: string
): void => {
  if (!isValid) {
    errors[field] = message;
  }
};
