import type { Nullable } from "@/app/types";
import type { ReservationFormErrorField } from "./ReservationFormField.constants";
import type { ValidatedReservationFormInput } from "./ValidatedReservationFormInput.interface";

export interface ReservationFormValidation {
  errors: Partial<
    Record<ReservationFormErrorField, string>
  >;
  value: Nullable<ValidatedReservationFormInput>;
}
