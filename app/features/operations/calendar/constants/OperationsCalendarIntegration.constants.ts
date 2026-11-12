import { CALENDAR_REALTIME } from "@/app/components/reservation-calendar/constants/CalendarRealtime.constants";

export const OPERATIONS_CALENDAR_REALTIME = {
  ...CALENDAR_REALTIME,
  CHANNEL: "operations-calendar",
} as const;
