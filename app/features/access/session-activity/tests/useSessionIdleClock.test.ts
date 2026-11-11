import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useRouter } from "next/navigation";
import { SESSION_STATE } from "@/app/constants";
import { buildLoginSessionIdlePath } from "@/app/utils/pathname/buildLoginSessionIdlePath";
import { SESSION_ACTIVITY } from "../constants/SessionActivity.constants";
import { SESSION_CLOCK } from "../constants/SessionClock.constants";
import { useSessionIdleClock } from "../hooks/useSessionIdleClock";
import type { SessionClockReading } from "../models/SessionClockReading.type";
import { readSessionSecondsLeft } from "../utils/readSessionSecondsLeft";
import { reportSessionActivity } from "../utils/reportSessionActivity";
import {
  CLOCK_FIXTURE,
  TRACKER_FIXTURE,
} from "./SessionActivity.constants";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../utils/readSessionSecondsLeft", () => ({
  readSessionSecondsLeft: vi.fn(),
}));

vi.mock("../utils/reportSessionActivity", () => ({
  reportSessionActivity: vi.fn(),
}));

const replace = vi.fn();

const liveFor = (
  secondsLeft: number
): SessionClockReading => ({
  kind: SESSION_CLOCK.LIVE,
  secondsLeft,
});

const answerWith = (reading: SessionClockReading): void => {
  vi.mocked(readSessionSecondsLeft).mockResolvedValue(
    reading
  );
};

const renderClock = async () => {
  const rendered = renderHook(useSessionIdleClock);
  await act(() => Promise.resolve());

  return rendered;
};

const advanceSeconds = async (
  seconds: number
): Promise<void> => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(
      seconds * SESSION_ACTIVITY.MS_PER_SECOND
    );
  });
};

describe("useSessionIdleClock", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(TRACKER_FIXTURE.START_MS);
    vi.mocked(useRouter).mockReturnValue({
      replace,
    } as unknown as ReturnType<typeof useRouter>);
    answerWith(liveFor(CLOCK_FIXTURE.DAY_SECONDS_LEFT));
    vi.mocked(reportSessionActivity).mockResolvedValue(
      SESSION_STATE.LIVE
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("asks the server as soon as the screen opens", async () => {
    await renderClock();

    expect(readSessionSecondsLeft).toHaveBeenCalledOnce();
  });

  it("shows no warning while the session has time", async () => {
    const { result } = await renderClock();

    expect(result.current.warningSeconds).toBeNull();
  });

  it("shows the warning when the server says two minutes or less", async () => {
    answerWith(liveFor(CLOCK_FIXTURE.WARNING_SECONDS_LEFT));

    const { result } = await renderClock();

    expect(result.current.warningSeconds).toBe(
      CLOCK_FIXTURE.WARNING_SECONDS_LEFT
    );
  });

  it("sends a session the server no longer keeps to the login", async () => {
    answerWith({ kind: SESSION_CLOCK.OVER });

    await renderClock();

    expect(replace).toHaveBeenCalledWith(
      buildLoginSessionIdlePath()
    );
  });

  it("stays put when the server cannot answer", async () => {
    answerWith({ kind: SESSION_CLOCK.UNKNOWN });

    const { result } = await renderClock();

    expect(replace).not.toHaveBeenCalled();
    expect(result.current.warningSeconds).toBeNull();
  });

  it("asks again when the phone shows the screen", async () => {
    await renderClock();

    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
      await Promise.resolve();
    });

    expect(readSessionSecondsLeft).toHaveBeenCalledTimes(2);
  });

  it("asks again when the warning time comes", async () => {
    answerWith(liveFor(CLOCK_FIXTURE.NIGHT_SECONDS_LEFT));
    const { result } = await renderClock();
    answerWith(
      liveFor(SESSION_ACTIVITY.WARNING_LEAD_SECONDS)
    );

    await advanceSeconds(
      CLOCK_FIXTURE.NIGHT_SECONDS_LEFT -
        SESSION_ACTIVITY.WARNING_LEAD_SECONDS
    );

    expect(result.current.warningSeconds).toBe(
      SESSION_ACTIVITY.WARNING_LEAD_SECONDS
    );
  });

  it("sends the worker to the login once the countdown ends", async () => {
    answerWith(liveFor(CLOCK_FIXTURE.WARNING_SECONDS_LEFT));
    await renderClock();
    answerWith({ kind: SESSION_CLOCK.OVER });

    await advanceSeconds(
      CLOCK_FIXTURE.WARNING_SECONDS_LEFT
    );

    expect(replace).toHaveBeenCalledWith(
      buildLoginSessionIdlePath()
    );
    expect(reportSessionActivity).not.toHaveBeenCalled();
  });

  it("keeps counting when the server still gives a few seconds at the end", async () => {
    answerWith(liveFor(CLOCK_FIXTURE.WARNING_SECONDS_LEFT));
    const { result } = await renderClock();
    answerWith(liveFor(CLOCK_FIXTURE.SKEWED_SECONDS_LEFT));

    await advanceSeconds(
      CLOCK_FIXTURE.WARNING_SECONDS_LEFT
    );

    expect(replace).not.toHaveBeenCalled();
    expect(result.current.warningSeconds).toBe(
      CLOCK_FIXTURE.SKEWED_SECONDS_LEFT
    );
  });

  it("reports the action and hides the warning when the worker keeps working", async () => {
    answerWith(liveFor(CLOCK_FIXTURE.WARNING_SECONDS_LEFT));
    const { result } = await renderClock();
    answerWith(liveFor(CLOCK_FIXTURE.NIGHT_SECONDS_LEFT));

    await act(() => result.current.keepWorking());

    expect(reportSessionActivity).toHaveBeenCalledOnce();
    expect(result.current.warningSeconds).toBeNull();
  });

  it("follows the server when keeping working finds the session closed", async () => {
    answerWith(liveFor(CLOCK_FIXTURE.WARNING_SECONDS_LEFT));
    const { result } = await renderClock();
    vi.mocked(reportSessionActivity).mockResolvedValue(
      SESSION_STATE.IDLE
    );

    await act(() => result.current.keepWorking());

    expect(replace).toHaveBeenCalledWith(
      buildLoginSessionIdlePath()
    );
  });

  it("stops asking once the screen closes", async () => {
    answerWith(liveFor(CLOCK_FIXTURE.NIGHT_SECONDS_LEFT));
    const { unmount } = await renderClock();

    unmount();
    await advanceSeconds(CLOCK_FIXTURE.NIGHT_SECONDS_LEFT);
    document.dispatchEvent(new Event("visibilitychange"));

    expect(readSessionSecondsLeft).toHaveBeenCalledOnce();
  });
});
