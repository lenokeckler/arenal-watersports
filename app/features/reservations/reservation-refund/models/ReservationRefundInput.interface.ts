import type { ReservationRefundValues } from "./ReservationRefundValues.interface";

export interface ReservationRefundInput extends ReservationRefundValues {
  reservationId: string;
}
