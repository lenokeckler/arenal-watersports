import type { Nullable } from "@/app/types";
import type { ReservationFormField } from "./ReservationFormField.constants";
import type { ValidatedReservationFormInput } from "./ValidatedReservationFormInput.interface";

export interface ReservationFormValidation {
  errors: Partial<Record<ReservationFormField, string>>;
  value: Nullable<ValidatedReservationFormInput>;
}
