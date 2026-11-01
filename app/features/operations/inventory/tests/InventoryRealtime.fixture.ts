import type {
  RealtimeChannel,
  REALTIME_SUBSCRIBE_STATES,
} from "@supabase/supabase-js";
import { vi } from "vitest";
import type { InventoryRealtimeListener } from "./models/InventoryRealtimeListener.type";
import { INVENTORY_REALTIME_TEST } from "./InventoryRealtime.constants";

const realtimeMocks = vi.hoisted(() => ({
  createBrowserSupabaseClient: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: realtimeMocks.useRouter,
}));
vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient:
    realtimeMocks.createBrowserSupabaseClient,
}));

const receiveInventoryChange = (
  calls: Parameters<InventoryRealtimeListener>[],
  table: string
): void => {
  const listener = calls.find(
    ([, filter]) => filter.table === table
  );
  if (!listener) {
    throw new Error(
      INVENTORY_REALTIME_TEST.MISSING_LISTENER
    );
  }
  listener[2]();
};

const receiveInventoryStatus = (
  calls: Parameters<RealtimeChannel["subscribe"]>[],
  status: REALTIME_SUBSCRIBE_STATES
): void => {
  const listener = calls[0]?.[0];
  if (!listener) {
    throw new Error(
      INVENTORY_REALTIME_TEST.MISSING_STATUS_LISTENER
    );
  }
  listener(status);
};

export const createInventoryRealtimeFixture = () => {
  const channel = {
    on: vi.fn<InventoryRealtimeListener>().mockReturnThis(),
    subscribe: vi
      .fn<RealtimeChannel["subscribe"]>()
      .mockReturnThis(),
    teardown: vi.fn(),
  };
  const refresh = vi.fn();
  const removeChannel = vi
    .fn()
    .mockResolvedValue(
      INVENTORY_REALTIME_TEST.REMOVE_STATUS.OK
    );
  realtimeMocks.useRouter.mockReturnValue({ refresh });
  realtimeMocks.createBrowserSupabaseClient.mockReturnValue(
    {
      channel: vi.fn(() => channel),
      removeChannel,
    }
  );
  return {
    channel,
    receiveChange: (table: string): void =>
      receiveInventoryChange(channel.on.mock.calls, table),
    receiveStatus: (
      status: REALTIME_SUBSCRIBE_STATES
    ): void =>
      receiveInventoryStatus(
        channel.subscribe.mock.calls,
        status
      ),
    refresh,
    removeChannel,
  };
};
