import type { ReservationRefundRecorded } from "./ReservationRefundRecorded.interface";

export interface ReservationRefundSuccessProps {
  code: string;
  recorded: ReservationRefundRecorded;
  reservationId: string;
}
