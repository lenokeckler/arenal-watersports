import type { ReservationExtraTimeValues } from "./ReservationExtraTimeValues.interface";

export interface ReservationExtraTimeInput extends ReservationExtraTimeValues {
  reservationId: string;
}
