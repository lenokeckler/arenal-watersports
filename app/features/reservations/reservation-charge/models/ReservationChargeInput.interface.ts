import type { ReservationChargeValues } from "./ReservationChargeValues.interface";

export interface ReservationChargeInput extends ReservationChargeValues {
  reservationId: string;
}
