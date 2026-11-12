import type { CustomComboReservationInput } from "./CustomComboReservationInput.interface";
import type { CustomComboReservationSubmission } from "./CustomComboReservationSubmission.interface";
import type { ReservationFormErrorField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface SubmitCustomComboDraftOptions {
  customCombo: CustomComboReservationSubmission;
  durationHours: number;
  requestErrorFocus: () => void;
  setFieldError: (
    field: ReservationFormErrorField,
    message: string
  ) => void;
  submitCustomComboReservation: (
    input: CustomComboReservationInput
  ) => void;
  values: ReservationFormInput;
}
