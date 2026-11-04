import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { act, renderHook } from "@testing-library/react";
import { REALTIME } from "@/app/components/realtime/constants/Realtime.constants";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createInventoryRealtimeFixture } from "./InventoryRealtime.fixture";
import { INVENTORY_REALTIME_TEST } from "./InventoryRealtime.constants";
import { useInventoryRealtimeRefresh } from "../hooks/useInventoryRealtimeRefresh";

describe("inventory realtime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(Object.values(INVENTORY_REALTIME_TEST.TABLES))(
    "refreshes inventory when %s changes",
    (table) => {
      const fixture = createInventoryRealtimeFixture();
      const { unmount } = renderHook(
        useInventoryRealtimeRefresh
      );

      act(() => {
        fixture.receiveChange(table);
        vi.advanceTimersByTime(REALTIME.COALESCE_MS);
      });

      expect(fixture.refresh).toHaveBeenCalledOnce();
      unmount();
    }
  );

  it("coalesces events from all inventory tables", () => {
    const fixture = createInventoryRealtimeFixture();
    const { unmount } = renderHook(
      useInventoryRealtimeRefresh
    );

    act(() => {
      Object.values(INVENTORY_REALTIME_TEST.TABLES).forEach(
        (table) => fixture.receiveChange(table)
      );
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });

    expect(fixture.refresh).toHaveBeenCalledOnce();
    unmount();
  });

  it("refreshes missed inventory changes after reconnect", () => {
    const fixture = createInventoryRealtimeFixture();
    const { unmount } = renderHook(
      useInventoryRealtimeRefresh
    );

    act(() => {
      fixture.receiveStatus(
        REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR
      );
      fixture.receiveStatus(
        REALTIME_SUBSCRIBE_STATES.TIMED_OUT
      );
      fixture.receiveStatus(
        REALTIME_SUBSCRIBE_STATES.SUBSCRIBED
      );
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });

    expect(fixture.refresh).toHaveBeenCalledOnce();
    unmount();
  });

  it("refreshes inventory when the browser comes online", () => {
    const fixture = createInventoryRealtimeFixture();
    const { unmount } = renderHook(
      useInventoryRealtimeRefresh
    );

    act(() => {
      window.dispatchEvent(new Event(REALTIME.ONLINE));
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });
    expect(fixture.refresh).toHaveBeenCalledOnce();
    unmount();
  });

  it("does not refresh for connection errors or closure", () => {
    const fixture = createInventoryRealtimeFixture();
    const { unmount } = renderHook(
      useInventoryRealtimeRefresh
    );

    act(() => {
      fixture.receiveStatus(
        REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR
      );
      fixture.receiveStatus(
        REALTIME_SUBSCRIBE_STATES.TIMED_OUT
      );
      fixture.receiveStatus(
        REALTIME_SUBSCRIBE_STATES.CLOSED
      );
    });

    expect(fixture.refresh).not.toHaveBeenCalled();
    unmount();
  });

  it("removes the channel and ignores late events after unmount", () => {
    const fixture = createInventoryRealtimeFixture();
    const { unmount } = renderHook(
      useInventoryRealtimeRefresh
    );

    unmount();
    fixture.receiveChange(
      INVENTORY_REALTIME_TEST.TABLES.UNITS
    );
    fixture.receiveStatus(
      REALTIME_SUBSCRIBE_STATES.SUBSCRIBED
    );

    expect(fixture.removeChannel).toHaveBeenCalledOnce();
    expect(fixture.removeChannel).toHaveBeenCalledWith(
      fixture.channel
    );
    expect(fixture.refresh).not.toHaveBeenCalled();
  });

  it.each(
    Object.values(INVENTORY_REALTIME_TEST.REMOVE_STATUS)
  )(
    "releases local resources when unsubscribe resolves with %s",
    async (status) => {
      const fixture = createInventoryRealtimeFixture();
      fixture.removeChannel.mockResolvedValue(status);
      const { unmount } = renderHook(
        useInventoryRealtimeRefresh
      );

      unmount();
      await Promise.resolve();

      expect(
        fixture.channel.teardown
      ).toHaveBeenCalledOnce();
    }
  );

  it("releases local resources when unsubscribe rejects", async () => {
    const fixture = createInventoryRealtimeFixture();
    fixture.removeChannel.mockRejectedValue(
      new Error(INVENTORY_REALTIME_TEST.DISCONNECT_ERROR)
    );
    const { unmount } = renderHook(
      useInventoryRealtimeRefresh
    );

    unmount();
    await Promise.resolve();

    expect(fixture.channel.teardown).toHaveBeenCalledOnce();
  });
});
