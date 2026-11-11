import type { ReservationPostponementFieldErrors } from "./ReservationPostponementFieldErrors.interface";
import type { ReservationPostponementReadingErrors } from "./ReservationPostponementReadingErrors.interface";

export interface ReservationPostponementRefusal {
  errors?: ReservationPostponementFieldErrors;
  formError?: string;
  message: string;
  reading?: ReservationPostponementReadingErrors;
}
