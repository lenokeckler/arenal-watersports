import type { ReservationType } from "./ReservationType.type";

export interface ReservationFormInput {
  categoryId: string;
  customerName: string;
  date: string;
  durationHours: number;
  peopleCount: number;
  quantity: number;
  reservationType?: ReservationType;
  time: string;
  unitId: string;
}
