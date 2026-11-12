import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { RESERVATION_EQUIPMENT_REALTIME } from "../constants/ReservationEquipmentRealtime.constants";
import {
  INITIAL_ELIGIBLE_CATEGORIES,
  realtimeHarness,
  resetRealtimeHarness,
} from "./ReservationEquipmentEligibility.testHarness";
import { useReservationEquipmentEligibility } from "../hooks/useReservationEquipmentEligibility";
import { createDeferred } from "./reservationAvailability.testHarness";

const renderSubscribedEligibilityHook = async () => {
  const hook = renderHook(() =>
    useReservationEquipmentEligibility(
      INITIAL_ELIGIBLE_CATEGORIES
    )
  );
  await waitFor(() =>
    expect(
      realtimeHarness.getSession
    ).toHaveBeenCalledOnce()
  );
  await waitFor(() =>
    expect(realtimeHarness.channelCount()).toBe(1)
  );
  act(() =>
    realtimeHarness.statusHandlers[0](
      REALTIME_SUBSCRIBE_STATES.SUBSCRIBED
    )
  );
  await waitFor(() =>
    expect(
      realtimeHarness.getCategories
    ).toHaveBeenCalledOnce()
  );
  return hook;
};

const expectInventoryChangesToRefreshCategories = async (
  subscribedTables: string[]
): Promise<void> => {
  const inventoryTables = [
    RESERVATION_EQUIPMENT_REALTIME.TABLE.RESERVATIONS,
    RESERVATION_EQUIPMENT_REALTIME.TABLE.ITEMS,
    RESERVATION_EQUIPMENT_REALTIME.TABLE.DISPATCHES,
    RESERVATION_EQUIPMENT_REALTIME.TABLE.UNITS,
    RESERVATION_EQUIPMENT_REALTIME.TABLE.STOCK,
    RESERVATION_EQUIPMENT_REALTIME.TABLE.CATEGORIES,
  ];
  for (const table of inventoryTables) {
    const handlerIndex = subscribedTables.indexOf(table);
    const refreshCount =
      realtimeHarness.getCategories.mock.calls.length;
    act(() =>
      realtimeHarness.eventHandlers[handlerIndex]()
    );
    await waitFor(() =>
      expect(
        realtimeHarness.getCategories
      ).toHaveBeenCalledTimes(refreshCount + 1)
    );
  }
};

describe("useReservationEquipmentEligibility inventory updates", () => {
  beforeEach(resetRealtimeHarness);

  it("refreshes categories on subscription and each inventory event", async () => {
    const { result } =
      await renderSubscribedEligibilityHook();
    const subscribedTables = Object.values(
      RESERVATION_EQUIPMENT_REALTIME.TABLE
    );
    expect(realtimeHarness.eventHandlers).toHaveLength(
      subscribedTables.length
    );
    await expectInventoryChangesToRefreshCategories(
      subscribedTables
    );
    expect(result.current.categories).toEqual(
      INITIAL_ELIGIBLE_CATEGORIES
    );
  });

  it("keeps the newest snapshot when refresh responses finish out of order", async () => {
    const { result } =
      await renderSubscribedEligibilityHook();
    const older =
      createDeferred<typeof INITIAL_ELIGIBLE_CATEGORIES>();
    const newest =
      createDeferred<typeof INITIAL_ELIGIBLE_CATEGORIES>();
    realtimeHarness.getCategories
      .mockReturnValueOnce(older.promise)
      .mockReturnValueOnce(newest.promise);

    act(() => realtimeHarness.eventHandlers[0]());
    act(() => realtimeHarness.eventHandlers[1]());
    await waitFor(() =>
      expect(
        realtimeHarness.getCategories
      ).toHaveBeenCalledTimes(3)
    );
    const newestCategories = [
      {
        ...INITIAL_ELIGIBLE_CATEGORIES[0],
        name: "Jet Ski actualizado",
      },
    ];
    await act(async () => {
      newest.resolve(newestCategories);
      await newest.promise;
    });
    await act(async () => {
      older.resolve([]);
      await older.promise;
    });

    expect(result.current.categories).toEqual(
      newestCategories
    );
    expect(result.current.hasError).toBe(false);
  });
});
