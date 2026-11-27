import type { ReservationDepositUnavailableReason } from "./ReservationDepositUnavailableReason.type";

export interface ReservationDepositUnavailableProps {
  reason: ReservationDepositUnavailableReason;
  reservationId: string;
}
