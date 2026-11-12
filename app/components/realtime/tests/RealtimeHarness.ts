import { createClient } from "@supabase/supabase-js";
import { vi } from "vitest";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import type { Database } from "@/app/types";
import {
  REALTIME_HARNESS,
  REALTIME_HARNESS_CLIENT,
} from "./RealtimeRefresh.constants";

export const createRealtimeHarness = () => {
  const client = createClient<Database>(
    REALTIME_HARNESS_CLIENT.URL,
    REALTIME_HARNESS_CLIENT.KEY
  );
  const channel = client.channel(
    REALTIME_HARNESS_CLIENT.CHANNEL
  );
  const on = vi.fn().mockReturnValue(channel);
  const subscribe = vi.fn().mockReturnValue(channel);
  const teardown = vi.fn();
  const createChannel = vi.fn().mockReturnValue(channel);
  const removeChannel = vi
    .fn()
    .mockResolvedValue(undefined);
  channel.on = on;
  channel.subscribe = subscribe;
  channel.teardown = teardown;
  client.channel = createChannel;
  client.removeChannel = removeChannel;
  vi.mocked(createBrowserSupabaseClient).mockReturnValue(
    client
  );

  const triggerChange = (): void => {
    on.mock.calls[REALTIME_HARNESS.FIRST_CALL][
      REALTIME_HARNESS.CHANGE_HANDLER_ARGUMENT
    ]();
  };

  const emitStatus = (status: string): void => {
    subscribe.mock.calls[REALTIME_HARNESS.FIRST_CALL][
      REALTIME_HARNESS.STATUS_HANDLER_ARGUMENT
    ](status);
  };

  return {
    channel,
    createChannel,
    emitStatus,
    on,
    removeChannel,
    subscribe,
    triggerChange,
  };
};
