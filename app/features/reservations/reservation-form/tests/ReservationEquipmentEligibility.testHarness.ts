import { vi } from "vitest";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";

export const realtimeHarness = (() => {
  const eventHandlers: Array<() => void> = [];
  const statusHandlers: Array<
    (status: REALTIME_SUBSCRIBE_STATES) => void
  > = [];
  const removeChannel = vi.fn();
  const getSession = vi.fn();
  const setAuth = vi.fn();
  let channelCount = 0;
  const channel = {
    on: (...argumentsList: unknown[]) => {
      const listener = argumentsList[2];
      if (typeof listener === "function") {
        eventHandlers.push(() => listener({}));
      }
      return channel;
    },
    subscribe: (...argumentsList: unknown[]) => {
      const listener = argumentsList[0];
      if (typeof listener === "function") {
        statusHandlers.push((status) => listener(status));
      }
      return channel;
    },
  };
  const getCategories = vi.fn();

  return {
    channel,
    channelCount: () => channelCount,
    eventHandlers,
    getCategories,
    getSession,
    incrementChannelCount: () => {
      channelCount += 1;
    },
    removeChannel,
    setAuth,
    resetChannelCount: () => {
      channelCount = 0;
    },
    statusHandlers,
  };
})();

vi.mock(
  "../actions/getReservationCategoriesAction",
  () => ({
    getReservationCategoriesAction:
      realtimeHarness.getCategories,
  })
);

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: () => ({
    auth: {
      getSession: realtimeHarness.getSession,
    },
    channel: () => {
      realtimeHarness.incrementChannelCount();
      return realtimeHarness.channel;
    },
    removeChannel: realtimeHarness.removeChannel,
    realtime: {
      setAuth: realtimeHarness.setAuth,
    },
  }),
}));

export const INITIAL_ELIGIBLE_CATEGORIES: ReservationCategoryOption[] =
  [
    {
      id: "category-1",
      isInterchangeable: true,
      name: "Jet Ski",
    },
  ];

export const resetRealtimeHarness = (): void => {
  realtimeHarness.eventHandlers.length = 0;
  realtimeHarness.statusHandlers.length = 0;
  realtimeHarness.removeChannel.mockClear();
  realtimeHarness.getSession.mockReset();
  realtimeHarness.getSession.mockResolvedValue({
    data: {
      session: { access_token: "test-token" },
    },
    error: null,
  });
  realtimeHarness.setAuth.mockReset();
  realtimeHarness.setAuth.mockResolvedValue(undefined);
  realtimeHarness.resetChannelCount();
  realtimeHarness.getCategories.mockReset();
  realtimeHarness.getCategories.mockResolvedValue(
    INITIAL_ELIGIBLE_CATEGORIES
  );
};
