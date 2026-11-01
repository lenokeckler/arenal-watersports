import { renderHook } from "@testing-library/react";
import { expect, it } from "vitest";
import { createInventoryRealtimeFixture } from "./InventoryRealtime.fixture";
import { INVENTORY_REALTIME_TEST } from "./InventoryRealtime.constants";
import { useInventoryRealtimeRefresh } from "../hooks/useInventoryRealtimeRefresh";

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
