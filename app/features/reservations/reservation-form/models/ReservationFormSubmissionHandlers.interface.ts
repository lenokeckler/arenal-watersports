import type { ReservationFormActionResult } from "./ReservationFormActionResult.type";

export interface ReservationFormSubmissionHandlers {
  applyResult: (
    result: ReservationFormActionResult
  ) => void;
  setSubmissionError: (message: string) => void;
}
