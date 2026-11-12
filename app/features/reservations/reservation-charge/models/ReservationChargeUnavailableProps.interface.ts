import type { ReservationChargeUnavailableReason } from "./ReservationChargeUnavailableReason.type";

export interface ReservationChargeUnavailableProps {
  reason: ReservationChargeUnavailableReason;
  reservationId: string;
}
