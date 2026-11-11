import type { ReservationPostponementErrors } from "./ReservationPostponementErrors.interface";
import type { ReservationPostponementFieldErrors } from "./ReservationPostponementFieldErrors.interface";
import type { ReservationPostponementInput } from "./ReservationPostponementInput.interface";
import type { ReservationPostponementReadingErrors } from "./ReservationPostponementReadingErrors.interface";

export interface ReservationPostponementSubmission {
  clearFieldError: (
    field: keyof ReservationPostponementFieldErrors
  ) => void;
  clearReadingError: (
    itemId: string,
    field: keyof ReservationPostponementReadingErrors
  ) => void;
  errors: ReservationPostponementErrors;
  formError: string;
  isPending: boolean;
  isStale: boolean;
  isSubmitted: boolean;
  reportErrors: (
    errors: ReservationPostponementErrors
  ) => void;
  submit: (
    input: ReservationPostponementInput
  ) => Promise<void>;
}
