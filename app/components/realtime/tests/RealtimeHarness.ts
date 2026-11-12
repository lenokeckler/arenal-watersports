import { vi } from "vitest";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";

export const createRealtimeHarness = () => {
  const channel = {
    on: vi.fn(),
    subscribe: vi.fn(),
    teardown: vi.fn(),
  };
  channel.on.mockReturnValue(channel);
  channel.subscribe.mockReturnValue(channel);
  const createChannel = vi.fn(() => channel);
  const removeChannel = vi
    .fn()
    .mockResolvedValue(undefined);
  vi.mocked(createBrowserSupabaseClient).mockReturnValue({
    channel: createChannel,
    removeChannel,
  } as unknown as ReturnType<
    typeof createBrowserSupabaseClient
  >);
  return { channel, createChannel, removeChannel };
};
