import type { ReservationFormErrorField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { CustomComboReservationInput } from "./CustomComboReservationInput.interface";
import type { CustomComboReservationSubmission } from "./CustomComboReservationSubmission.interface";

export interface ReservationFormSubmitOptions {
  requiresConcreteUnit: boolean;
  resolvedDurationHours: number;
  setFieldError: (
    field: ReservationFormErrorField,
    message: string
  ) => void;
  submitReservation: (input: ReservationFormInput) => void;
  customCombo: CustomComboReservationSubmission;
  submitCustomComboReservation: (
    input: CustomComboReservationInput
  ) => void;
  values: ReservationFormInput;
}
