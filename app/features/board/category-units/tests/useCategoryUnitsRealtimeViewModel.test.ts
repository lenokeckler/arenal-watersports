import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { REALTIME } from "@/app/components/realtime/constants/Realtime.constants";
import { createRealtimeHarness } from "@/app/components/realtime/tests/RealtimeHarness";
import { BOARD_REALTIME } from "@/app/constants";
import { useCategoryUnitsRealtimeViewModel } from "../hooks/useCategoryUnitsRealtimeViewModel";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

const CHANGE_HANDLER_ARGUMENT_INDEX = 2;
const FIRST_CALL_INDEX = 0;
const STATUS_HANDLER_ARGUMENT_INDEX = 0;

describe("useCategoryUnitsRealtimeViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("listens to the board channel on every table that decides its numbers", () => {
    const { channel, createChannel } =
      createRealtimeHarness();
    renderHook(() => useCategoryUnitsRealtimeViewModel());

    expect(createChannel).toHaveBeenCalledWith(
      BOARD_REALTIME.CHANNEL.CATEGORY_UNITS
    );
    expect(
      channel.on.mock.calls.map(
        ([, filter]) => filter.table
      )
    ).toEqual([...BOARD_REALTIME.TABLES]);
  });

  it("refreshes the server render once after a burst of changes", () => {
    const { channel } = createRealtimeHarness();
    renderHook(() => useCategoryUnitsRealtimeViewModel());
    const change =
      channel.on.mock.calls[FIRST_CALL_INDEX][
        CHANGE_HANDLER_ARGUMENT_INDEX
      ];
    act(() => {
      change();
      change();
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });

    expect(refresh).toHaveBeenCalledOnce();
  });

  it("flags a lost connection and clears it once subscribed", () => {
    const { channel } = createRealtimeHarness();
    const { result } = renderHook(() =>
      useCategoryUnitsRealtimeViewModel()
    );
    const status =
      channel.subscribe.mock.calls[FIRST_CALL_INDEX][
        STATUS_HANDLER_ARGUMENT_INDEX
      ];
    act(() => status(REALTIME.STATUS.CHANNEL_ERROR));
    expect(result.current.hasConnectionError).toBe(true);
    act(() => status(REALTIME.STATUS.SUBSCRIBED));
    expect(result.current.hasConnectionError).toBe(false);
  });
});
