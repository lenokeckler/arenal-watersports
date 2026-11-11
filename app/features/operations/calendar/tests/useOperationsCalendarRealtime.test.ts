import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { OPERATIONS_CALENDAR_REALTIME } from "../constants/OperationsCalendarIntegration.constants";
import { useOperationsCalendarRealtime } from "../hooks/useOperationsCalendarRealtime";

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

describe("useOperationsCalendarRealtime", (): void => {
  beforeEach((): void => {
    vi.resetAllMocks();
  });

  it("subscribes to each table that can change calendar data", (): void => {
    const on = vi.fn();
    const subscribe = vi.fn();
    const channel = { on, subscribe, teardown: vi.fn() };
    on.mockReturnValue(channel);
    subscribe.mockReturnValue(channel);
    const removeChannel = vi
      .fn()
      .mockResolvedValue(undefined);
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
      useOperationsCalendarRealtime(vi.fn())
    );

    expect(
      on.mock.calls.map(([, filter]) => filter.table)
    ).toEqual([
      OPERATIONS_CALENDAR_REALTIME.TABLES.RESERVATIONS,
      OPERATIONS_CALENDAR_REALTIME.TABLES.DISPATCHES,
      OPERATIONS_CALENDAR_REALTIME.TABLES.ITEMS,
    ]);
    expect(subscribe).toHaveBeenCalledOnce();

    unmount();

    expect(removeChannel).toHaveBeenCalledWith(channel);
  });
});
