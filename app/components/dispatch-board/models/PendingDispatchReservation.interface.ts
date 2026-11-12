import type { Database } from "@/app/types";

export interface PendingDispatchReservation {
  id: string;
  code: string;
  customer_name: string;
  starts_at: string;
  status: Database["public"]["Enums"]["reservation_status"];
}
