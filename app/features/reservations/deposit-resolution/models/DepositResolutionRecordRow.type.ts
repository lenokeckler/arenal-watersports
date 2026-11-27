import type { Database } from "@/app/types";

export type DepositResolutionRecordRow =
  Database["public"]["Functions"]["resolve_reservation_deposit"]["Returns"][number];
