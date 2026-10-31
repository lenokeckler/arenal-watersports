import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { CALENDAR_REALTIME } from "../constants/CalendarRealtime.constants";
import { createCalendarRefreshScheduler } from "./createCalendarRefreshScheduler";
import { subscribeCalendarTables } from "./subscribeCalendarTables";

export const subscribeCalendarRealtime = (
  channelName: string,
  notify: () => void,
  onConnectionError: (hasError: boolean) => void
): (() => void) => {
  const supabase = createBrowserSupabaseClient();
  const scheduler = createCalendarRefreshScheduler(notify);
  const channel = supabase.channel(channelName);
  subscribeCalendarTables(channel, scheduler.schedule);
  channel.subscribe((status) => {
    if (scheduler.isDisposed()) {
      return;
    }
    const subscribed =
      status === CALENDAR_REALTIME.STATUS.SUBSCRIBED;
    onConnectionError(!subscribed);
    if (subscribed) {
      scheduler.schedule();
    }
  });
  window.addEventListener(
    CALENDAR_REALTIME.ONLINE,
    scheduler.schedule
  );
  return () => {
    scheduler.dispose();
    window.removeEventListener(
      CALENDAR_REALTIME.ONLINE,
      scheduler.schedule
    );
    void supabase.removeChannel(channel);
  };
};
