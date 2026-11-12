import type { PredefinedComboReservationInput } from "./PredefinedComboReservationInput.interface";
import type { PredefinedComboReservationSubmission } from "./PredefinedComboReservationSubmission.interface";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface SubmitPredefinedComboDraftOptions {
  durationHours: number;
  predefinedCombo: PredefinedComboReservationSubmission;
  requestErrorFocus: () => void;
  setSubmissionError: (message: string) => void;
  submitPredefinedComboReservation: (
    input: PredefinedComboReservationInput,
    onSuccess?: () => void
  ) => void;
  onSuccess?: () => void;
  values: ReservationFormInput;
}
