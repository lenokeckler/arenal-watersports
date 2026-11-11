import type { RealtimeChannel } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { REALTIME } from "../constants/Realtime.constants";
import type { RealtimeSubscriptionOptions } from "../models/RealtimeSubscriptionOptions.interface";
import { createRealtimeRefreshScheduler } from "./createRealtimeRefreshScheduler";
import { subscribeRealtimeTables } from "./subscribeRealtimeTables";

const isConnectionError = (status: string): boolean =>
  status === REALTIME.STATUS.CHANNEL_ERROR ||
  status === REALTIME.STATUS.TIMED_OUT ||
  status === REALTIME.STATUS.CLOSED;

const releaseChannel = (channel: RealtimeChannel): void => {
  channel.teardown();
};

export const subscribeRealtimeRefresh = (
  options: RealtimeSubscriptionOptions
): (() => void) => {
  const supabase = createBrowserSupabaseClient();
  const scheduler = createRealtimeRefreshScheduler(
    options.onRefresh
  );
  const channel = supabase.channel(options.channelName);
  subscribeRealtimeTables(
    channel,
    options.schema,
    options.tables,
    scheduler.schedule
  );
  channel.subscribe((status) => {
    if (scheduler.isDisposed()) {
      return;
    }
    if (isConnectionError(status)) {
      options.onConnectionError?.(true);
      return;
    }
    if (status !== REALTIME.STATUS.SUBSCRIBED) {
      return;
    }
    options.onConnectionError?.(false);
    scheduler.schedule();
  });
  const refreshWhenOnline = (): void =>
    scheduler.schedule();
  window.addEventListener(
    REALTIME.ONLINE,
    refreshWhenOnline
  );
  return () => {
    scheduler.dispose();
    window.removeEventListener(
      REALTIME.ONLINE,
      refreshWhenOnline
    );
    void supabase.removeChannel(channel).then(
      () => releaseChannel(channel),
      () => releaseChannel(channel)
    );
  };
};
