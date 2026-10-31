import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { RESERVATION_CALENDAR_REALTIME } from "../constants/ReservationCalendarRealtime.constants";
import { useReservationsCalendarRealtime } from "../hooks/useReservationsCalendarRealtime";

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

describe("useReservationsCalendarRealtime", (): void => {
  beforeEach((): void => {
    vi.resetAllMocks();
  });

  it("subscribes to each table that can change calendar data", (): void => {
    const on = vi.fn();
    const subscribe = vi.fn();
    const channel = { on, subscribe };
    on.mockReturnValue(channel);
    subscribe.mockReturnValue(channel);
    const removeChannel = vi.fn();
    const supabase = {
      channel: vi.fn(() => channel),
      removeChannel,
    };
    vi.mocked(createBrowserSupabaseClient).mockReturnValue(
      supabase as unknown as ReturnType<
        typeof createBrowserSupabaseClient
      >
    );

    const { unmount } = renderHook(() =>
      useReservationsCalendarRealtime(vi.fn())
    );

    expect(
      on.mock.calls.map(([, filter]) => filter.table)
    ).toEqual([
      RESERVATION_CALENDAR_REALTIME.TABLES.RESERVATIONS,
      RESERVATION_CALENDAR_REALTIME.TABLES.DISPATCHES,
      RESERVATION_CALENDAR_REALTIME.TABLES.ITEMS,
    ]);
    expect(subscribe).toHaveBeenCalledOnce();

    unmount();

    expect(removeChannel).toHaveBeenCalledWith(channel);
  });
});
