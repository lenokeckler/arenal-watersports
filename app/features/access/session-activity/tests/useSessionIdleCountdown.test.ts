import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SESSION_ACTIVITY } from "../constants/SessionActivity.constants";
import { useSessionIdleCountdown } from "../hooks/useSessionIdleCountdown";
import type { SessionIdleHandlers } from "../models/SessionIdleHandlers.interface";
import {
  CLOCK_FIXTURE,
  TRACKER_FIXTURE,
} from "./SessionActivity.constants";

const onExpire = vi.fn<SessionIdleHandlers["onExpire"]>();
const onRecheck = vi.fn<SessionIdleHandlers["onRecheck"]>();

const renderCountdown = () =>
  renderHook(() =>
    useSessionIdleCountdown({
      current: { onExpire, onRecheck },
    })
  );

const toMs = (seconds: number): number =>
  seconds * SESSION_ACTIVITY.MS_PER_SECOND;

describe("useSessionIdleCountdown", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(TRACKER_FIXTURE.START_MS);
    onExpire.mockResolvedValue(undefined);
    onRecheck.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts without a warning", () => {
    const { result } = renderCountdown();

    expect(result.current.warningSeconds).toBeNull();
  });

  it("keeps the warning hidden and asks again when two minutes are left", () => {
    const { result } = renderCountdown();

    act(() => {
      result.current.schedule(
        CLOCK_FIXTURE.NIGHT_SECONDS_LEFT
      );
    });
    act(() => {
      vi.advanceTimersByTime(
        toMs(
          CLOCK_FIXTURE.NIGHT_SECONDS_LEFT -
            SESSION_ACTIVITY.WARNING_LEAD_SECONDS
        ) - 1
      );
    });

    expect(result.current.warningSeconds).toBeNull();
    expect(onRecheck).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(onRecheck).toHaveBeenCalledOnce();
  });

  it("shows the warning at once with two minutes or less", () => {
    const { result } = renderCountdown();

    act(() => {
      result.current.schedule(
        CLOCK_FIXTURE.WARNING_SECONDS_LEFT
      );
    });

    expect(result.current.warningSeconds).toBe(
      CLOCK_FIXTURE.WARNING_SECONDS_LEFT
    );
  });

  it("counts the warning down every second", () => {
    const { result } = renderCountdown();

    act(() => {
      result.current.schedule(
        CLOCK_FIXTURE.WARNING_SECONDS_LEFT
      );
    });
    act(() => {
      vi.advanceTimersByTime(
        SESSION_ACTIVITY.COUNTDOWN_TICK_MS
      );
    });

    expect(result.current.warningSeconds).toBe(
      CLOCK_FIXTURE.ONE_TICK_LATER
    );
  });

  it("hands over to the server once the countdown ends", () => {
    const { result } = renderCountdown();

    act(() => {
      result.current.schedule(
        CLOCK_FIXTURE.WARNING_SECONDS_LEFT
      );
    });
    act(() => {
      vi.advanceTimersByTime(
        toMs(CLOCK_FIXTURE.WARNING_SECONDS_LEFT)
      );
    });

    expect(result.current.warningSeconds).toBe(0);
    expect(onExpire).toHaveBeenCalledOnce();
  });

  it("hides the warning when a new schedule gives more time", () => {
    const { result } = renderCountdown();

    act(() => {
      result.current.schedule(
        CLOCK_FIXTURE.WARNING_SECONDS_LEFT
      );
    });
    act(() => {
      result.current.schedule(
        CLOCK_FIXTURE.NIGHT_SECONDS_LEFT
      );
    });
    act(() => {
      vi.advanceTimersByTime(
        toMs(CLOCK_FIXTURE.WARNING_SECONDS_LEFT)
      );
    });

    expect(result.current.warningSeconds).toBeNull();
    expect(onExpire).not.toHaveBeenCalled();
  });

  it("stops every timer", () => {
    const { result } = renderCountdown();

    act(() => {
      result.current.schedule(
        CLOCK_FIXTURE.WARNING_SECONDS_LEFT
      );
      result.current.stop();
    });
    act(() => {
      vi.advanceTimersByTime(
        toMs(CLOCK_FIXTURE.NIGHT_SECONDS_LEFT)
      );
    });

    expect(onExpire).not.toHaveBeenCalled();
    expect(onRecheck).not.toHaveBeenCalled();
  });
});
