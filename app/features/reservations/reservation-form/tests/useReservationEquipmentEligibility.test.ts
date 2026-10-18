import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  INITIAL_ELIGIBLE_CATEGORIES,
  realtimeHarness,
  resetRealtimeHarness,
} from "./ReservationEquipmentEligibility.testHarness";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { useReservationEquipmentEligibility } from "../hooks/useReservationEquipmentEligibility";

describe("useReservationEquipmentEligibility inventory updates", () => {
  beforeEach(resetRealtimeHarness);

  it("refreshes categories on subscription and each inventory event", async () => {
    const { result } = renderHook(() =>
      useReservationEquipmentEligibility(
        INITIAL_ELIGIBLE_CATEGORIES
      )
    );

    await waitFor(() =>
      expect(realtimeHarness.channelCount()).toBe(1)
    );
    expect(realtimeHarness.eventHandlers).toHaveLength(3);
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
    act(() => realtimeHarness.eventHandlers[0]());
    await waitFor(() =>
      expect(
        realtimeHarness.getCategories
      ).toHaveBeenCalledTimes(2)
    );
    expect(result.current.categories).toEqual(
      INITIAL_ELIGIBLE_CATEGORIES
    );
  });

  it("keeps the newest snapshot when refresh responses finish out of order", async () => {
    const { result } = renderHook(() =>
      useReservationEquipmentEligibility(
        INITIAL_ELIGIBLE_CATEGORIES
      )
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
    let resolveOlder = (
      _categories: typeof INITIAL_ELIGIBLE_CATEGORIES
    ): void => undefined;
    let resolveNewest = (
      _categories: typeof INITIAL_ELIGIBLE_CATEGORIES
    ): void => undefined;
    realtimeHarness.getCategories
      .mockImplementationOnce(
        () =>
          new Promise<typeof INITIAL_ELIGIBLE_CATEGORIES>(
            (resolve) => {
              resolveOlder = resolve;
            }
          )
      )
      .mockImplementationOnce(
        () =>
          new Promise<typeof INITIAL_ELIGIBLE_CATEGORIES>(
            (resolve) => {
              resolveNewest = resolve;
            }
          )
      );

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
      resolveNewest(newestCategories);
      await Promise.resolve();
    });
    await act(async () => {
      resolveOlder([]);
      await Promise.resolve();
    });

    expect(result.current.categories).toEqual(
      newestCategories
    );
    expect(result.current.hasError).toBe(false);
  });
});
