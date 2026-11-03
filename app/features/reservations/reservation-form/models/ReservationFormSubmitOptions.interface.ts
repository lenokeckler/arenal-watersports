import type { ReservationFormField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationFormSubmitOptions {
  requiresConcreteUnit: boolean;
  resolvedDurationHours: number;
  setFieldError: (
    field: ReservationFormField,
    message: string
  ) => void;
  submitReservation: (input: ReservationFormInput) => void;
  values: ReservationFormInput;
}
