import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationEquipmentRequestValues extends ReservationFormInput {
  excludeReservationId?: string;
}
