import type { ReservationDepositRecorded } from "./ReservationDepositRecorded.interface";

export interface ReservationDepositSuccessProps {
  code: string;
  recorded: ReservationDepositRecorded;
  reservationId: string;
}
