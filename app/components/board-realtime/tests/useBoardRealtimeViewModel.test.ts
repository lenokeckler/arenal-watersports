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
import { useBoardRealtimeViewModel } from "../hooks/useBoardRealtimeViewModel";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

const CHANNEL_NAME = BOARD_REALTIME.CHANNEL.EQUIPMENT_BOARD;

describe("useBoardRealtimeViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("listens to the given channel on every table that decides the board numbers", () => {
    const { createChannel, on } = createRealtimeHarness();
    renderHook(() =>
      useBoardRealtimeViewModel(CHANNEL_NAME)
    );

    expect(createChannel).toHaveBeenCalledWith(
      expect.stringContaining(CHANNEL_NAME)
    );
    expect(
      on.mock.calls.map(([, filter]) => filter.table)
    ).toEqual([...BOARD_REALTIME.TABLES]);
  });

  it("refreshes the server render once after a burst of changes", () => {
    const { triggerChange } = createRealtimeHarness();
    renderHook(() =>
      useBoardRealtimeViewModel(CHANNEL_NAME)
    );
    act(() => {
      triggerChange();
      triggerChange();
      vi.advanceTimersByTime(REALTIME.COALESCE_MS);
    });

    expect(refresh).toHaveBeenCalledOnce();
  });

  it("flags a lost connection and clears it once subscribed", () => {
    const { emitStatus } = createRealtimeHarness();
    const { result } = renderHook(() =>
      useBoardRealtimeViewModel(CHANNEL_NAME)
    );
    act(() => emitStatus(REALTIME.STATUS.CHANNEL_ERROR));
    expect(result.current.hasConnectionError).toBe(true);
    act(() => emitStatus(REALTIME.STATUS.SUBSCRIBED));
    expect(result.current.hasConnectionError).toBe(false);
  });
});
