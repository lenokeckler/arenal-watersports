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

describe("useReservationEquipmentEligibility connection", () => {
  beforeEach(resetRealtimeHarness);

  it("clears options on connection loss and restores them on reconnection", async () => {
    const { result, unmount } = renderHook(() =>
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
    act(() =>
      realtimeHarness.statusHandlers[0](
        REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR
      )
    );

    expect(result.current.categories).toEqual(
      INITIAL_ELIGIBLE_CATEGORIES
    );
    expect(result.current.hasError).toBe(true);
    realtimeHarness.getCategories.mockResolvedValueOnce(
      INITIAL_ELIGIBLE_CATEGORIES
    );
    act(() =>
      realtimeHarness.statusHandlers[0](
        REALTIME_SUBSCRIBE_STATES.SUBSCRIBED
      )
    );
    await waitFor(() =>
      expect(result.current.categories).toEqual(
        INITIAL_ELIGIBLE_CATEGORIES
      )
    );
    unmount();

    expect(
      realtimeHarness.removeChannel
    ).toHaveBeenCalledOnce();
  });

  it("removes selectable categories after a refresh request fails", async () => {
    const { result } = renderHook(() =>
      useReservationEquipmentEligibility(
        INITIAL_ELIGIBLE_CATEGORIES
      )
    );
    await waitFor(() =>
      expect(realtimeHarness.channelCount()).toBe(1)
    );
    realtimeHarness.getCategories.mockRejectedValueOnce(
      new Error("Refresh failed")
    );
    act(() =>
      realtimeHarness.statusHandlers[0](
        REALTIME_SUBSCRIBE_STATES.SUBSCRIBED
      )
    );

    await waitFor(() =>
      expect(result.current.hasError).toBe(true)
    );
    expect(result.current.categories).toEqual(
      INITIAL_ELIGIBLE_CATEGORIES
    );

    realtimeHarness.getCategories.mockResolvedValueOnce(
      INITIAL_ELIGIBLE_CATEGORIES
    );
    act(() => result.current.retry());
    await waitFor(() =>
      expect(result.current.categories).toEqual(
        INITIAL_ELIGIBLE_CATEGORIES
      )
    );
  });

  it("does not open a realtime channel without a browser session", async () => {
    realtimeHarness.getSession.mockResolvedValueOnce({
      data: { session: null },
      error: null,
    });
    const { result } = renderHook(() =>
      useReservationEquipmentEligibility(
        INITIAL_ELIGIBLE_CATEGORIES
      )
    );

    await waitFor(() =>
      expect(result.current.hasError).toBe(true)
    );

    expect(result.current.categories).toEqual(
      INITIAL_ELIGIBLE_CATEGORIES
    );
    expect(result.current.isLoading).toBe(false);
    expect(realtimeHarness.channelCount()).toBe(0);
  });

  it("does not open a realtime channel when applying the session fails", async () => {
    realtimeHarness.setAuth.mockRejectedValueOnce(
      new Error("Authentication failed")
    );
    const { result } = renderHook(() =>
      useReservationEquipmentEligibility(
        INITIAL_ELIGIBLE_CATEGORIES
      )
    );

    await waitFor(() =>
      expect(result.current.hasError).toBe(true)
    );

    expect(realtimeHarness.channelCount()).toBe(0);
  });

  it.each([
    REALTIME_SUBSCRIBE_STATES.CLOSED,
    REALTIME_SUBSCRIBE_STATES.TIMED_OUT,
  ])(
    "clears selectable categories when the channel is %s",
    async (status) => {
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
        expect(result.current.isLoading).toBe(false)
      );
      act(() => realtimeHarness.statusHandlers[0](status));

      expect(result.current.categories).toEqual(
        INITIAL_ELIGIBLE_CATEGORIES
      );
      expect(result.current.hasError).toBe(true);
    }
  );

  it("recreates a failed channel on retry instead of subscribing twice", async () => {
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
        REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR
      )
    );
    act(() => result.current.retry());

    await waitFor(() =>
      expect(realtimeHarness.channelCount()).toBe(2)
    );
    expect(
      realtimeHarness.removeChannel
    ).toHaveBeenCalledOnce();
    expect(realtimeHarness.statusHandlers).toHaveLength(2);
  });
});
