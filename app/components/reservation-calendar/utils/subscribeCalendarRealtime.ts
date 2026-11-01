import { CALENDAR_REALTIME } from "../constants/CalendarRealtime.constants";
import { subscribeRealtimeRefresh } from "@/app/components/realtime/utils/subscribeRealtimeRefresh";

export const subscribeCalendarRealtime = (
  channelName: string,
  notify: () => void,
  onConnectionError: (hasError: boolean) => void
): (() => void) =>
  subscribeRealtimeRefresh({
    channelName,
    onConnectionError,
    onRefresh: notify,
    schema: CALENDAR_REALTIME.SCHEMA,
    tables: Object.values(CALENDAR_REALTIME.TABLES),
  });
