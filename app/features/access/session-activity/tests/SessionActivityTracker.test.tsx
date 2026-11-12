import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render } from "@testing-library/react";
import type { NullableRef } from "@/app/types";
import SessionActivityTracker from "../SessionActivityTracker";
import { SESSION_IDLE_SIGN_OUT_PHASE } from "../constants/SessionIdleSignOutPhase.constants";
import { useSessionActivityTracker } from "../hooks/useSessionActivityTracker";
import { useSessionIdleClock } from "../hooks/useSessionIdleClock";
import { useSessionIdleSignOut } from "../hooks/useSessionIdleSignOut";
import { WARNING_FIXTURE } from "./SessionActivity.constants";
import { createSessionIdleWarningPage } from "./SessionIdleWarning.page";

vi.mock("../hooks/useSessionActivityTracker", () => ({
  useSessionActivityTracker: vi.fn(),
}));

vi.mock("../hooks/useSessionIdleClock", () => ({
  useSessionIdleClock: vi.fn(),
}));

vi.mock("../hooks/useSessionIdleSignOut", () => ({
  useSessionIdleSignOut: vi.fn(),
}));

const keepWorking = vi.fn<() => Promise<void>>();
const sync = vi.fn<() => Promise<void>>();
const signOut = vi.fn<() => Promise<void>>();

const showWarning = (
  warningSeconds: NullableRef<number>
): void => {
  vi.mocked(useSessionIdleClock).mockReturnValue({
    keepWorking,
    sync,
    warningSeconds,
  });
};

describe("SessionActivityTracker", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    keepWorking.mockResolvedValue(undefined);
    signOut.mockResolvedValue(undefined);
    vi.mocked(useSessionIdleSignOut).mockReturnValue({
      phase: SESSION_IDLE_SIGN_OUT_PHASE.IDLE,
      signOut,
    });
  });

  it("reports activity and lets the clock follow every live report", () => {
    showWarning(null);

    render(<SessionActivityTracker />);

    expect(useSessionActivityTracker).toHaveBeenCalledWith(
      sync
    );
  });

  it("shows nothing while there is time left", () => {
    showWarning(null);

    render(<SessionActivityTracker />);

    expect(
      createSessionIdleWarningPage().queryDialog()
    ).not.toBeInTheDocument();
  });

  it("shows the warning with the seconds the clock gives", () => {
    showWarning(WARNING_FIXTURE.SECONDS_LEFT);

    render(<SessionActivityTracker />);

    expect(
      createSessionIdleWarningPage().getDialog()
    ).toHaveTextContent(WARNING_FIXTURE.SHOWN_COUNTDOWN);
  });

  it("keeps working from the warning", async () => {
    showWarning(WARNING_FIXTURE.SECONDS_LEFT);
    render(<SessionActivityTracker />);
    const page = createSessionIdleWarningPage();

    await page.press(page.getKeepWorking());

    expect(keepWorking).toHaveBeenCalledOnce();
  });
});
