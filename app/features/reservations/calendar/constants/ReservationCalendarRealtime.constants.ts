import { CALENDAR_REALTIME } from "@/app/components/reservation-calendar/constants/CalendarRealtime.constants";

export const RESERVATION_CALENDAR_REALTIME = {
  ...CALENDAR_REALTIME,
  CHANNEL: "reservation-calendar",
} as const;
