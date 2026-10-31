import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { renderHook } from "@testing-library/react";
import { expect, it } from "vitest";
import { createInventoryRealtimeFixture } from "./InventoryRealtime.fixture";
import { INVENTORY_REALTIME_TEST } from "./InventoryRealtime.constants";
import { useInventoryRealtimeRefresh } from "../hooks/useInventoryRealtimeRefresh";

it.each(Object.values(INVENTORY_REALTIME_TEST.TABLES))(
  "refreshes inventory when %s changes",
  (table) => {
    const fixture = createInventoryRealtimeFixture();
    const { unmount } = renderHook(
      useInventoryRealtimeRefresh
    );

    fixture.receiveChange(table);

    expect(fixture.refresh).toHaveBeenCalledOnce();
    unmount();
  }
);

it("recovers missed inventory changes after reconnecting", () => {
  const fixture = createInventoryRealtimeFixture();
  const { unmount } = renderHook(
    useInventoryRealtimeRefresh
  );

  fixture.receiveStatus(
    REALTIME_SUBSCRIBE_STATES.SUBSCRIBED
  );
  fixture.receiveStatus(
    REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR
  );
  fixture.receiveStatus(
    REALTIME_SUBSCRIBE_STATES.SUBSCRIBED
  );

  expect(fixture.refresh).toHaveBeenCalledTimes(2);
  unmount();
});

it("does not refresh for failed or closed connections", () => {
  const fixture = createInventoryRealtimeFixture();
  const { unmount } = renderHook(
    useInventoryRealtimeRefresh
  );

  fixture.receiveStatus(
    REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR
  );
  fixture.receiveStatus(
    REALTIME_SUBSCRIBE_STATES.TIMED_OUT
  );
  fixture.receiveStatus(REALTIME_SUBSCRIBE_STATES.CLOSED);

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

    expect(fixture.channel.teardown).toHaveBeenCalledOnce();
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
