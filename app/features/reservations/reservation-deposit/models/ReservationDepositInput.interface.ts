import type { ReservationDepositValues } from "./ReservationDepositValues.interface";

export interface ReservationDepositInput extends ReservationDepositValues {
  reservationId: string;
}
