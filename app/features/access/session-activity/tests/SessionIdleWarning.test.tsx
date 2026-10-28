import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import SessionIdleWarning from "../components/SessionIdleWarning";
import { SESSION_IDLE_SIGN_OUT_PHASE } from "../constants/SessionIdleSignOutPhase.constants";
import { SESSION_IDLE_WARNING_COPY } from "../constants/SessionIdleWarningCopy.constants";
import type { SessionIdleSignOutPhase } from "../models/SessionIdleSignOutPhase.type";
import { WARNING_FIXTURE } from "./SessionActivity.constants";
import { createSessionIdleWarningPage } from "./SessionIdleWarning.page";

const renderWarning = (
  signOutPhase: SessionIdleSignOutPhase = SESSION_IDLE_SIGN_OUT_PHASE.IDLE
) => {
  const onKeepWorking = vi.fn();
  const onSignOut = vi.fn();

  render(
    <SessionIdleWarning
      onKeepWorking={onKeepWorking}
      onSignOut={onSignOut}
      secondsLeft={WARNING_FIXTURE.SECONDS_LEFT}
      signOutPhase={signOutPhase}
    />
  );

  return {
    onKeepWorking,
    onSignOut,
    page: createSessionIdleWarningPage(),
  };
};

describe("SessionIdleWarning", () => {
  it("is an alert dialog named by its question", () => {
    const { page } = renderWarning();

    expect(page.getDialog()).toHaveAccessibleName(
      SESSION_IDLE_WARNING_COPY.TITLE
    );
  });

  it("describes how long is left", () => {
    const { page } = renderWarning();

    expect(page.getDialog()).toHaveAccessibleDescription(
      `${SESSION_IDLE_WARNING_COPY.COUNTDOWN_LEAD}${WARNING_FIXTURE.SHOWN_COUNTDOWN}`
    );
  });

  it("puts the keep working button under the thumb first", () => {
    const { page } = renderWarning();

    expect(page.getKeepWorking()).toHaveFocus();
  });

  it("keeps working when the worker asks", async () => {
    const { onKeepWorking, page } = renderWarning();

    await page.press(page.getKeepWorking());

    expect(onKeepWorking).toHaveBeenCalledOnce();
  });

  it("signs out when the worker asks", async () => {
    const { onSignOut, page } = renderWarning();

    await page.press(
      page.getSignOut(SESSION_IDLE_WARNING_COPY.SIGN_OUT)
    );

    expect(onSignOut).toHaveBeenCalledOnce();
  });

  it("shows the sign out in progress without disabling the button", () => {
    const { page } = renderWarning(
      SESSION_IDLE_SIGN_OUT_PHASE.PENDING
    );

    expect(
      page.getSignOut(SESSION_IDLE_WARNING_COPY.SIGNING_OUT)
    ).toHaveAttribute(
      WARNING_FIXTURE.ARIA_DISABLED_ATTRIBUTE,
      WARNING_FIXTURE.ARIA_DISABLED_TRUE
    );
  });

  it("says when signing out failed", () => {
    const { page } = renderWarning(
      SESSION_IDLE_SIGN_OUT_PHASE.FAILED
    );

    expect(page.queryError()).toHaveTextContent(
      SESSION_IDLE_WARNING_COPY.SIGN_OUT_FAILED
    );
  });

  it("shows no error before a failed sign out", () => {
    const { page } = renderWarning();

    expect(page.queryError()).not.toBeInTheDocument();
  });
});
