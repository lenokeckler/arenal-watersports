import type { ReservationPostponementCause } from "./ReservationPostponementCause.type";
import type { ReservationPostponementReadingInput } from "./ReservationPostponementReadingInput.interface";

export interface ReservationPostponementInput {
  cause: ReservationPostponementCause;
  date: string;
  expectedUpdatedAt: string;
  readings: ReservationPostponementReadingInput[];
  reason: string;
  reservationId: string;
  time: string;
}
