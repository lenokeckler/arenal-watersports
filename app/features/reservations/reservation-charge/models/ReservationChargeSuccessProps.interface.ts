import type { ReservationChargeRecorded } from "./ReservationChargeRecorded.interface";

export interface ReservationChargeSuccessProps {
  code: string;
  recorded: ReservationChargeRecorded;
  reservationId: string;
}
