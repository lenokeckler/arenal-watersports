import { subscribeRealtimeTables } from "@/app/components/realtime/utils/subscribeRealtimeTables";
import { CALENDAR_REALTIME } from "../constants/CalendarRealtime.constants";

export const subscribeCalendarTables = (
  channel: Parameters<typeof subscribeRealtimeTables>[0],
  onChange: () => void
): void =>
  subscribeRealtimeTables(
    channel,
    CALENDAR_REALTIME.SCHEMA,
    Object.values(CALENDAR_REALTIME.TABLES),
    onChange
  );
