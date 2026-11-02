import type { RealtimeChannel } from "@supabase/supabase-js";
import { REALTIME } from "../constants/Realtime.constants";
import type { RealtimeRefreshCallback } from "../models/RealtimeRefreshCallback.type";

export const subscribeRealtimeTables = (
  channel: RealtimeChannel,
  schema: string,
  tables: readonly string[],
  onChange: RealtimeRefreshCallback
): void => {
  for (const table of tables) {
    channel.on(
      REALTIME.CHANGE,
      {
        event: REALTIME.EVENT,
        schema,
        table,
      },
      onChange
    );
  }
};
