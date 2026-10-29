import type { Database } from "@/app/types";

export const RESERVATION_CALENDAR_EXCLUDED_STATUS = {
  CANCELLED: "cancelled",
  CLOSED: "closed",
} as const satisfies Record<
  string,
  Database["public"]["Enums"]["reservation_status"]
>;
