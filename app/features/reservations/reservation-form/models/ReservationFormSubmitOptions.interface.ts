import type { ReservationFormField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { CustomComboReservationInput } from "./CustomComboReservationInput.interface";
import type { CustomComboReservationSubmission } from "./CustomComboReservationSubmission.interface";
import type { PredefinedComboReservationSubmission } from "./PredefinedComboReservationSubmission.interface";
import type { PredefinedComboReservationInput } from "./PredefinedComboReservationInput.interface";

export interface ReservationFormSubmitOptions {
  requiresConcreteUnit: boolean;
  resolvedDurationHours: number;
  setFieldError: (
    field: ReservationFormField,
    message: string
  ) => void;
  submitReservation: (input: ReservationFormInput) => void;
  customCombo: CustomComboReservationSubmission;
  submitCustomComboReservation: (
    input: CustomComboReservationInput
  ) => void;
  submitPredefinedComboReservation: (
    input: PredefinedComboReservationInput
  ) => void;
  setSubmissionError: (message: string) => void;
  predefinedCombo: PredefinedComboReservationSubmission;
  values: ReservationFormInput;
}
