import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { REALTIME } from "../constants/Realtime.constants";
import { useRealtimeRefresh } from "../hooks/useRealtimeRefresh";
import { REALTIME_REFRESH_TEST } from "./RealtimeRefresh.constants";
import { createRealtimeHarness } from "./RealtimeHarness";

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

describe("useRealtimeRefresh", () => {
  const renderRealtimeRefresh = (onRefresh: () => void) =>
    renderHook(() =>
      useRealtimeRefresh({
        channelName: REALTIME_REFRESH_TEST.CHANNEL,
        onRefresh,
        tables: REALTIME_REFRESH_TEST.TABLES,
      })
    );

  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("subscribes to the given channel and every table", () => {
    const { createChannel, on, subscribe } =
      createRealtimeHarness();
    renderRealtimeRefresh(vi.fn());
    expect(createChannel).toHaveBeenCalledWith(
      expect.stringContaining(REALTIME_REFRESH_TEST.CHANNEL)
    );
    expect(on).toHaveBeenCalledTimes(
      REALTIME_REFRESH_TEST.TABLES.length
    );
    REALTIME_REFRESH_TEST.TABLES.forEach((table, index) => {
      expect(on.mock.calls[index][1]).toEqual({
        event: REALTIME.EVENT,
        schema: REALTIME.SCHEMA,
        table,
      });
    });
    expect(subscribe).toHaveBeenCalledOnce();
  });

  it("calls onRefresh once for a burst of changes", () => {
    const { triggerChange } = createRealtimeHarness();
    const onRefresh = vi.fn();
    renderRealtimeRefresh(onRefresh);
    act(() => {
      for (
        let count = 0;
        count < REALTIME_REFRESH_TEST.BURST_COUNT;
        count += 1
      ) {
        triggerChange();
      }
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });
    expect(onRefresh).toHaveBeenCalledOnce();
  });

  it("reports the connection error and clears it when subscribed again", () => {
    const { emitStatus } = createRealtimeHarness();
    const onRefresh = vi.fn();
    const { result } = renderRealtimeRefresh(onRefresh);
    act(() =>
      emitStatus(REALTIME_REFRESH_TEST.CONNECTING_STATUS)
    );
    expect(result.current).toBe(false);
    act(() => emitStatus(REALTIME.STATUS.CHANNEL_ERROR));
    expect(result.current).toBe(true);
    act(() => emitStatus(REALTIME.STATUS.TIMED_OUT));
    expect(result.current).toBe(true);
    act(() => {
      emitStatus(REALTIME.STATUS.SUBSCRIBED);
      window.dispatchEvent(new Event(REALTIME.ONLINE));
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });
    expect(result.current).toBe(false);
    expect(onRefresh).toHaveBeenCalledOnce();
  });

  it("joins a channel with a new name every time it subscribes, so a late leave cannot close the new one", () => {
    const { createChannel } = createRealtimeHarness();
    const first = renderRealtimeRefresh(vi.fn());
    first.unmount();
    renderRealtimeRefresh(vi.fn());
    const [firstName, secondName] =
      createChannel.mock.calls.map(([name]) => name);
    expect(firstName).not.toBe(secondName);
  });

  it("refreshes on its own every fallback interval while the page is visible", () => {
    createRealtimeHarness();
    const onRefresh = vi.fn();
    renderRealtimeRefresh(onRefresh);
    act(() => {
      vi.advanceTimersByTime(
        REALTIME.FALLBACK_REFRESH_MS + REALTIME.COALESCE_MS
      );
    });
    expect(onRefresh).toHaveBeenCalledOnce();
  });

  it("does not refresh on its own while the page is hidden, and refreshes when it is shown again", () => {
    createRealtimeHarness();
    const onRefresh = vi.fn();
    const visibility = vi
      .spyOn(document, "visibilityState", "get")
      .mockReturnValue(REALTIME_REFRESH_TEST.HIDDEN_STATE);
    renderRealtimeRefresh(onRefresh);
    act(() => {
      vi.advanceTimersByTime(
        REALTIME.FALLBACK_REFRESH_MS + REALTIME.COALESCE_MS
      );
    });
    expect(onRefresh).not.toHaveBeenCalled();
    visibility.mockReturnValue(REALTIME.VISIBLE);
    act(() => {
      document.dispatchEvent(
        new Event(REALTIME.VISIBILITY_CHANGE)
      );
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });
    expect(onRefresh).toHaveBeenCalledOnce();
    visibility.mockRestore();
  });

  it("removes the channel and drops pending refreshes on unmount", () => {
    const { channel, removeChannel, triggerChange } =
      createRealtimeHarness();
    const onRefresh = vi.fn();
    const { unmount } = renderRealtimeRefresh(onRefresh);
    act(triggerChange);
    unmount();
    act(() => {
      window.dispatchEvent(new Event(REALTIME.ONLINE));
      vi.advanceTimersByTime(
        REALTIME.FALLBACK_REFRESH_MS + REALTIME.COALESCE_MS
      );
    });
    expect(onRefresh).not.toHaveBeenCalled();
    expect(removeChannel).toHaveBeenCalledWith(channel);
  });
});
