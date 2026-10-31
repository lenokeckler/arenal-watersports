import type { RealtimeChannel } from "@supabase/supabase-js";
import { CALENDAR_REALTIME } from "../constants/CalendarRealtime.constants";

export const subscribeCalendarTables = (
  channel: RealtimeChannel,
  onChange: () => void
): void => {
  for (const table of Object.values(
    CALENDAR_REALTIME.TABLES
  )) {
    channel.on(
      CALENDAR_REALTIME.CHANGE,
      {
        event: CALENDAR_REALTIME.EVENT,
        schema: CALENDAR_REALTIME.SCHEMA,
        table,
      },
      onChange
    );
  }
};
