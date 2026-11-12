import type { ReservationPostponementFieldErrors } from "./ReservationPostponementFieldErrors.interface";
import type { ReservationPostponementReadingErrors } from "./ReservationPostponementReadingErrors.interface";

export interface ReservationPostponementErrors extends ReservationPostponementFieldErrors {
  readings: Record<
    string,
    ReservationPostponementReadingErrors
  >;
}
