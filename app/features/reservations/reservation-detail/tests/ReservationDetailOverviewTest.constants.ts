import type { Database } from "@/app/types";

export const RESERVATION_DETAIL_OVERVIEW_TEST = {
  CANCELLATION_REASON: "Weather warning",
  CANCELLED_RESERVATION_STATUS: "cancelled",
  COMBO_NAME: "Arenal family outing",
  CUSTOMER_NAME: "Taylor Morgan",
  DURATION_MINUTES: 120,
  PEOPLE_COUNT: 3,
  RESERVATION_CODE: "R-000012",
  RESERVATION_ID: "00000000-0000-4000-8000-000000000001",
  RESERVATION_START: "2026-10-21T09:00:00.000Z",
  RESERVATION_END: "2026-10-21T11:00:00.000Z",
  TIMESTAMP: "2026-10-20T12:00:00.000Z",
  RESERVATION_STATUS: "scheduled",
  RESERVATION_TYPE:
    "rental" satisfies Database["public"]["Enums"]["reservation_type"],
  COMBO_RESERVATION_TYPE:
    "combo" satisfies Database["public"]["Enums"]["reservation_type"],
} as const;
