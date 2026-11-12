import type { ReservationCancellationItemRow } from "./ReservationCancellationItemRow.interface";
import type { ReservationCancellationStatus } from "./ReservationCancellationStatus.type";

export interface ReservationCancellationRow {
  code: string;
  customer_name: string;
  id: string;
  reservation_items: ReservationCancellationItemRow[];
  starts_at: string;
  status: ReservationCancellationStatus;
  updated_at: string;
}
