import type { Database } from "@/app/types";

export type ReservationHistoryListRow =
  Database["public"]["Functions"]["list_reservation_history"]["Returns"][number];
