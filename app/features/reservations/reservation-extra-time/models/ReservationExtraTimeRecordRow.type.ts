import type { Database } from "@/app/types";

export type ReservationExtraTimeRecordRow =
  Database["public"]["Functions"]["record_reservation_extra_time"]["Returns"][number];
