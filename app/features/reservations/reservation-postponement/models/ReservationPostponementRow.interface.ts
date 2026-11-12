import type { ReservationPostponementItemRow } from "./ReservationPostponementItemRow.interface";
import type { ReservationPostponementStatus } from "./ReservationPostponementStatus.type";

export interface ReservationPostponementRow {
  code: string;
  customer_name: string;
  duration_minutes: number;
  id: string;
  reservation_items: ReservationPostponementItemRow[];
  starts_at: string;
  status: ReservationPostponementStatus;
  updated_at: string;
}
