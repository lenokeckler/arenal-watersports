import type { ReservationStatus } from "@/app/constants";

export interface UnitReservationItem {
  id: string;
  code: string;
  customerName: string;
  startsAt: string;
  status: ReservationStatus;
}
