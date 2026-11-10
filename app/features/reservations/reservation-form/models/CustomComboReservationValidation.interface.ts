import type { Nullable } from "@/app/types";
import type { CustomComboReservationField } from "./CustomComboReservationField.constants";
import type { ValidatedCustomComboReservationInput } from "./ValidatedCustomComboReservationInput.interface";

export interface CustomComboReservationValidation {
  errors: Partial<
    Record<CustomComboReservationField, string>
  >;
  value: Nullable<ValidatedCustomComboReservationInput>;
}
