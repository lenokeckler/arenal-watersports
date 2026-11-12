import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationEditInput extends ReservationFormInput {
  expectedUpdatedAt: string;
  reservationId: string;
}
