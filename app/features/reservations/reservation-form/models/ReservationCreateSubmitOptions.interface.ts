import type { CustomComboReservationInput } from "./CustomComboReservationInput.interface";
import type { PredefinedComboReservationInput } from "./PredefinedComboReservationInput.interface";
import type { PredefinedComboReservationSubmission } from "./PredefinedComboReservationSubmission.interface";
import type { CustomComboReservationSubmission } from "./CustomComboReservationSubmission.interface";
import type { ReservationFormActionResult } from "./ReservationFormActionResult.type";
import type { ReservationFormErrorField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationCreateSubmitOptions {
  applyResult: (
    result: ReservationFormActionResult
  ) => void;
  customCombo: CustomComboReservationSubmission;
  durationHours: number;
  isQuantityUnavailable: boolean;
  onUnitUnavailable: () => void;
  onSuccess: () => void;
  predefinedCombo: PredefinedComboReservationSubmission;
  requestErrorFocus: () => void;
  requiresConcreteUnit: boolean;
  setFieldError: (
    field: ReservationFormErrorField,
    message: string
  ) => void;
  setSubmissionError: (message: string) => void;
  submitPredefinedComboReservation: (
    input: PredefinedComboReservationInput
  ) => void;
  submitCustomComboReservation: (
    input: CustomComboReservationInput
  ) => void;
  submitReservation: (
    input: ReservationFormInput,
    onUnitUnavailable: () => void,
    onSuccess: () => void
  ) => void;
  values: ReservationFormInput;
}
