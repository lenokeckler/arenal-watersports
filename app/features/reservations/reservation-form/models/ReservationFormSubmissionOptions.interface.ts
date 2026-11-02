import type { ReservationFormActionResult } from "./ReservationFormActionResult.type";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationFormSubmissionOptions {
  submitAction?: (
    values: ReservationFormInput
  ) => Promise<ReservationFormActionResult>;
  submitErrorCopy?: string;
}
