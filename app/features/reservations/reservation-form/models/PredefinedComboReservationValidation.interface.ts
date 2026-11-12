import type { NullableRef } from "@/app/types";
import type { PredefinedComboReservationField } from "./PredefinedComboReservationField.constants";
import type { ValidatedPredefinedComboReservationInput } from "./ValidatedPredefinedComboReservationInput.interface";

export interface PredefinedComboReservationValidation {
  errors: Partial<
    Record<PredefinedComboReservationField, string>
  >;
  value: NullableRef<ValidatedPredefinedComboReservationInput>;
}
