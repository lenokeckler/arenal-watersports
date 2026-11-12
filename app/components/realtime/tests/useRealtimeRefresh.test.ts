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

const CHANGE_HANDLER_ARGUMENT_INDEX = 2;
const FIRST_CALL_INDEX = 0;
const STATUS_HANDLER_ARGUMENT_INDEX = 0;

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
    const { channel, createChannel } =
      createRealtimeHarness();
    renderRealtimeRefresh(vi.fn());
    expect(createChannel).toHaveBeenCalledWith(
      REALTIME_REFRESH_TEST.CHANNEL
    );
    expect(channel.on).toHaveBeenCalledTimes(
      REALTIME_REFRESH_TEST.TABLES.length
    );
    REALTIME_REFRESH_TEST.TABLES.forEach((table, index) => {
      expect(channel.on.mock.calls[index][1]).toEqual({
        event: REALTIME.EVENT,
        schema: REALTIME.SCHEMA,
        table,
      });
    });
    expect(channel.subscribe).toHaveBeenCalledOnce();
  });

  it("calls onRefresh once for a burst of changes", () => {
    const { channel } = createRealtimeHarness();
    const onRefresh = vi.fn();
    renderRealtimeRefresh(onRefresh);
    const change =
      channel.on.mock.calls[FIRST_CALL_INDEX][
        CHANGE_HANDLER_ARGUMENT_INDEX
      ];
    act(() => {
      for (
        let count = 0;
        count < REALTIME_REFRESH_TEST.BURST_COUNT;
        count += 1
      ) {
        change();
      }
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });
    expect(onRefresh).toHaveBeenCalledOnce();
  });

  it("reports the connection error and clears it when subscribed again", () => {
    const { channel } = createRealtimeHarness();
    const onRefresh = vi.fn();
    const { result } = renderRealtimeRefresh(onRefresh);
    const status =
      channel.subscribe.mock.calls[FIRST_CALL_INDEX][
        STATUS_HANDLER_ARGUMENT_INDEX
      ];
    act(() =>
      status(REALTIME_REFRESH_TEST.CONNECTING_STATUS)
    );
    expect(result.current).toBe(false);
    act(() => status(REALTIME.STATUS.CHANNEL_ERROR));
    expect(result.current).toBe(true);
    act(() => status(REALTIME.STATUS.TIMED_OUT));
    expect(result.current).toBe(true);
    act(() => {
      status(REALTIME.STATUS.SUBSCRIBED);
      window.dispatchEvent(new Event(REALTIME.ONLINE));
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });
    expect(result.current).toBe(false);
    expect(onRefresh).toHaveBeenCalledOnce();
  });

  it("removes the channel and drops pending refreshes on unmount", () => {
    const { channel, removeChannel } =
      createRealtimeHarness();
    const onRefresh = vi.fn();
    const { unmount } = renderRealtimeRefresh(onRefresh);
    act(() =>
      channel.on.mock.calls[FIRST_CALL_INDEX][
        CHANGE_HANDLER_ARGUMENT_INDEX
      ]()
    );
    unmount();
    act(() => {
      window.dispatchEvent(new Event(REALTIME.ONLINE));
      vi.runAllTimers();
    });
    expect(onRefresh).not.toHaveBeenCalled();
    expect(removeChannel).toHaveBeenCalledWith(channel);
  });
});
