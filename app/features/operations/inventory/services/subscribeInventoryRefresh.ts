import {
  REALTIME_LISTEN_TYPES,
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
  REALTIME_SUBSCRIBE_STATES,
  type RealtimeChannel,
} from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { INVENTORY_REALTIME } from "../constants/InventoryRealtime.constants";

const registerInventoryChanges = (
  channel: RealtimeChannel,
  refresh: () => void
): void => {
  Object.values(INVENTORY_REALTIME.TABLES).forEach(
    (table) => {
      channel.on(
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
        {
          event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL,
          schema: INVENTORY_REALTIME.SCHEMA,
          table,
        },
        refresh
      );
    }
  );
};

export const subscribeInventoryRefresh = (
  refresh: () => void
): (() => void) => {
  const supabase = createBrowserSupabaseClient();
  const channel = supabase.channel(
    INVENTORY_REALTIME.CHANNEL
  );
  let isActive = true;
  const refreshInventory = (): void => {
    if (isActive) {
      refresh();
    }
  };
  registerInventoryChanges(channel, refreshInventory);
  channel.subscribe((status) => {
    if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
      refreshInventory();
    }
  });

  return () => {
    isActive = false;
    const releaseLocalChannel = (): void =>
      channel.teardown();
    void supabase
      .removeChannel(channel)
      .then(releaseLocalChannel, releaseLocalChannel);
  };
};
