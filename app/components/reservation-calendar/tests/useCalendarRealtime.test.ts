import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { useCalendarRealtime } from "../hooks/useCalendarRealtime";
import { CALENDAR_CLIENT_TEST } from "./CalendarClient.constants";
import { CALENDAR_REALTIME } from "../constants/CalendarRealtime.constants";

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

const createRealtimeHarness = () => {
  const channel = { on: vi.fn(), subscribe: vi.fn() };
  channel.on.mockReturnValue(channel);
  channel.subscribe.mockReturnValue(channel);
  const removeChannel = vi
    .fn()
    .mockResolvedValue(undefined);
  vi.mocked(createBrowserSupabaseClient).mockReturnValue({
    channel: vi.fn(() => channel),
    removeChannel,
  } as unknown as ReturnType<
    typeof createBrowserSupabaseClient
  >);
  return { channel, removeChannel };
};

describe("calendar realtime", () => {
  const useRealtime = (refresh: () => void) =>
    useCalendarRealtime(
      CALENDAR_CLIENT_TEST.CHANNEL,
      refresh
    );
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("coalesces changes and refreshes after online and restored subscription", () => {
    const { channel } = createRealtimeHarness();
    const refresh = vi.fn();
    const { result } = renderHook(() =>
      useRealtime(refresh)
    );
    const change = channel.on.mock.calls[0][2];
    const status = channel.subscribe.mock.calls[0][0];
    act(() => {
      change();
      change();
      change();
      vi.advanceTimersByTime(CALENDAR_REALTIME.COALESCE_MS);
    });
    expect(refresh).toHaveBeenCalledOnce();
    act(() => status(CALENDAR_REALTIME.STATUS.ERROR));
    expect(result.current).toBe(true);
    act(() => {
      status(CALENDAR_REALTIME.STATUS.SUBSCRIBED);
      window.dispatchEvent(
        new Event(CALENDAR_REALTIME.ONLINE)
      );
      vi.advanceTimersByTime(CALENDAR_REALTIME.COALESCE_MS);
    });
    expect(refresh).toHaveBeenCalledTimes(
      CALENDAR_CLIENT_TEST.REFRESHES_AFTER_RECONNECT
    );
    expect(result.current).toBe(false);
  });

  it("cleans up the channel, pending timer and online listener on unmount", () => {
    const { channel, removeChannel } =
      createRealtimeHarness();
    const refresh = vi.fn();
    const { unmount } = renderHook(() =>
      useRealtime(refresh)
    );
    act(() => channel.on.mock.calls[0][2]());
    unmount();
    act(() => {
      window.dispatchEvent(
        new Event(CALENDAR_REALTIME.ONLINE)
      );
      vi.runAllTimers();
    });
    expect(refresh).not.toHaveBeenCalled();
    expect(removeChannel).toHaveBeenCalledWith(channel);
  });
});
