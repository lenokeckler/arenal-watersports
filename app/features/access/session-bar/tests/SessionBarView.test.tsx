import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import SessionBarView from "../SessionBarView";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import {
  ANNOUNCEMENT,
  BUTTON_LABEL,
  ERROR_MESSAGE,
  IDLE_PROPS,
  NON_FAILED_PHASES,
  SESSION_BAR_BUTTON_COUNT,
} from "./SessionBarView.constants";
import { createSessionBarViewPage } from "./SessionBarView.page";

describe("SessionBarView", () => {
  it("renders exactly one banner landmark", () => {
    render(<SessionBarView {...IDLE_PROPS} />);
    const page = createSessionBarViewPage();

    expect(page.getBanners()).toHaveLength(1);
  });

  it("renders the logout button alongside the theme control when idle", () => {
    render(<SessionBarView {...IDLE_PROPS} />);
    const page = createSessionBarViewPage();

    expect(page.getButtons()).toHaveLength(
      SESSION_BAR_BUTTON_COUNT
    );
    expect(
      page.getThemeButton(IDLE_PROPS.theme)
    ).toBeInTheDocument();
    expect(
      page.getButton(BUTTON_LABEL)
    ).toBeInTheDocument();
  });

  it("puts the button last in the row", () => {
    render(<SessionBarView {...IDLE_PROPS} />);
    const page = createSessionBarViewPage();

    expect(page.getLastRowItem()).toBe(
      page.getButton(BUTTON_LABEL)
    );
  });

  it("shows the announcement in the status region", () => {
    render(
      <SessionBarView
        {...IDLE_PROPS}
        phase={LOGOUT_PHASE.PENDING}
        pendingAnnouncement={ANNOUNCEMENT}
      />
    );
    const page = createSessionBarViewPage();

    expect(page.getStatus()).toHaveTextContent(
      ANNOUNCEMENT
    );
  });

  it("shows the error inside the header when the message is set", () => {
    render(
      <SessionBarView
        {...IDLE_PROPS}
        phase={LOGOUT_PHASE.FAILED}
        errorMessage={ERROR_MESSAGE}
      />
    );
    const page = createSessionBarViewPage();

    expect(page.queryAlert()).toHaveTextContent(
      ERROR_MESSAGE
    );
  });

  it("keeps the button last in the row while the error shows", () => {
    render(
      <SessionBarView
        {...IDLE_PROPS}
        phase={LOGOUT_PHASE.FAILED}
        errorMessage={ERROR_MESSAGE}
      />
    );
    const page = createSessionBarViewPage();

    expect(page.getLastRowItem()).toBe(
      page.getButton(BUTTON_LABEL)
    );
  });

  it.each(NON_FAILED_PHASES)(
    "shows no error banner in the %s phase",
    (phase) => {
      render(
        <SessionBarView
          {...IDLE_PROPS}
          phase={phase}
        />
      );
      const page = createSessionBarViewPage();

      expect(page.queryAlertAnywhere()).toBeNull();
    }
  );
});
