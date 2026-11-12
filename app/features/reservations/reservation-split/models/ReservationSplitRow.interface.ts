import type { Database } from "@/app/types";
import type { ReservationSplitItemRow } from "./ReservationSplitItemRow.interface";

export interface ReservationSplitRow {
  code: string;
  customer_name: string;
  duration_minutes: number;
  id: string;
  people_count: number;
  reservation_items: ReservationSplitItemRow[];
  starts_at: string;
  status: Database["public"]["Enums"]["reservation_status"];
  updated_at: string;
}
