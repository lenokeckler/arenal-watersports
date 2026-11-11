import type { UnitReservationItem } from "./UnitReservationItem.interface";

export interface UnitReservationPage {
  reservations: UnitReservationItem[];
  pageCount: number;
}
