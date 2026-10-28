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
import {
  PATHS,
  SESSION_STATE,
  type SessionState,
} from "@/app/constants";
import { buildLoginSessionIdlePath } from "@/app/utils/pathname/buildLoginSessionIdlePath";
import {
  SESSION_ACTIVITY,
  SESSION_ACTIVITY_EVENTS,
} from "../constants/SessionActivity.constants";
import { useSessionActivityTracker } from "../hooks/useSessionActivityTracker";
import { reportSessionActivity } from "../utils/reportSessionActivity";
import { TRACKER_FIXTURE } from "./SessionActivity.constants";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../utils/reportSessionActivity", () => ({
  reportSessionActivity: vi.fn(),
}));

const replace = vi.fn();

const actOn = async (eventName: string): Promise<void> => {
  act(() => {
    window.dispatchEvent(new Event(eventName));
  });
  await act(() => Promise.resolve());
};

const answerWith = (state: SessionState): void => {
  vi.mocked(reportSessionActivity).mockResolvedValue(state);
};

describe("useSessionActivityTracker", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(TRACKER_FIXTURE.START_MS);
    vi.mocked(useRouter).mockReturnValue({
      replace,
    } as unknown as ReturnType<typeof useRouter>);
    answerWith(SESSION_STATE.LIVE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(SESSION_ACTIVITY_EVENTS)(
    "reports the action on %s",
    async (eventName) => {
      renderHook(useSessionActivityTracker);

      await actOn(eventName);

      expect(reportSessionActivity).toHaveBeenCalledTimes(
        1
      );
    }
  );

  it("ignores events that are not actions of the worker", async () => {
    renderHook(useSessionActivityTracker);

    await actOn(TRACKER_FIXTURE.OTHER_EVENT);

    expect(reportSessionActivity).not.toHaveBeenCalled();
  });

  it("reports at most once inside the interval", async () => {
    renderHook(useSessionActivityTracker);

    await actOn(SESSION_ACTIVITY_EVENTS[0]);
    vi.setSystemTime(
      TRACKER_FIXTURE.START_MS +
        TRACKER_FIXTURE.JUST_BEFORE_INTERVAL_MS
    );
    await actOn(SESSION_ACTIVITY_EVENTS[1]);

    expect(reportSessionActivity).toHaveBeenCalledTimes(1);
  });

  it("reports again once the interval has passed", async () => {
    renderHook(useSessionActivityTracker);

    await actOn(SESSION_ACTIVITY_EVENTS[0]);
    vi.setSystemTime(
      TRACKER_FIXTURE.START_MS +
        SESSION_ACTIVITY.REPORT_INTERVAL_MS
    );
    await actOn(SESSION_ACTIVITY_EVENTS[0]);

    expect(reportSessionActivity).toHaveBeenCalledTimes(2);
  });

  it("stays on the screen while the session is live", async () => {
    renderHook(useSessionActivityTracker);

    await actOn(SESSION_ACTIVITY_EVENTS[0]);

    expect(replace).not.toHaveBeenCalled();
  });

  it.each([
    [SESSION_STATE.IDLE, buildLoginSessionIdlePath()],
    [SESSION_STATE.ENDED, PATHS.ACCESS.LOGIN],
  ])(
    "replaces the screen when the session is %s",
    async (state, expectedPath) => {
      answerWith(state);
      renderHook(useSessionActivityTracker);

      await actOn(SESSION_ACTIVITY_EVENTS[0]);

      expect(replace).toHaveBeenCalledWith(expectedPath);
    }
  );

  it("stops listening once unmounted", async () => {
    const { unmount } = renderHook(
      useSessionActivityTracker
    );

    unmount();
    await actOn(SESSION_ACTIVITY_EVENTS[0]);

    expect(reportSessionActivity).not.toHaveBeenCalled();
  });
});
