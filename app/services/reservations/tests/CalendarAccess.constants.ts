import { CALENDAR_VIEW } from "@/app/constants";

export const CALENDAR_ACCESS_REQUEST = {
  anchor: { day: 29, month: 10, year: 2026 },
  view: CALENDAR_VIEW.DAY,
} as const;
