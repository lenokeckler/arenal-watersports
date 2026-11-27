import type { Database } from "@/app/types";

export type ReservationDepositRecordRow =
  Database["public"]["Functions"]["record_reservation_deposit"]["Returns"][number];
