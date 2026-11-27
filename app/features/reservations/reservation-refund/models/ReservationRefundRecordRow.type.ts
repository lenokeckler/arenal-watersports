import type { Database } from "@/app/types";

export type ReservationRefundRecordRow =
  Database["public"]["Functions"]["record_reservation_refund"]["Returns"][number];
