import type { ReservationChargePart } from "./ReservationChargePart.interface";

export interface ReservationChargeCommand {
  parts: readonly ReservationChargePart[];
  paymentMethod: string;
  reservationId: string;
}
