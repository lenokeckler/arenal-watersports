import { describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { PATHS, STRING } from "@/app/constants";
import { isNodeBefore } from "@/app/utils/dom/tests/isNodeBefore";
import {
  FIELD_ERROR_MESSAGE,
  HREF_ATTRIBUTE,
} from "./passwordRecoveryScreen.constants";
import { UNKNOWN_ERROR } from "./passwordRecoveryReset.constants";
import {
  NO_ALERTS,
  NO_VALIDATE_PROPERTY,
  PRESET_USERNAME,
  SINGLE_ALERT,
} from "./passwordRecoveryView.constants";
import { renderPasswordRecoveryResetFormView } from "./renderPasswordRecoveryResetFormView";

describe("PasswordRecoveryResetFormView", () => {
  it("prefills the username and leaves the PIN empty", () => {
    const page = renderPasswordRecoveryResetFormView();

    expect(page.getUsernameInput()).toHaveValue(
      PRESET_USERNAME
    );
    expect(page.getPinInput()).toHaveValue(STRING.Empty);
    expect(page.queryAlerts()).toHaveLength(NO_ALERTS);
  });

  it("leaves validation to the form logic, not the browser", () => {
    const page = renderPasswordRecoveryResetFormView();

    expect(page.getForm()).toHaveProperty(
      NO_VALIDATE_PROPERTY,
      true
    );
  });

  it("orders heading, notice, fields and submit", () => {
    const page = renderPasswordRecoveryResetFormView();
    const ordered = [
      page.getHeading(),
      page.getNotice(),
      page.getUsernameInput(),
      page.getPinInput(),
      page.getSubmit(),
    ];

    ordered.slice(1).forEach((node, index) => {
      expect(isNodeBefore(ordered[index], node)).toBe(true);
    });
  });

  it("puts the not-received box, with the no-email note and the another-PIN link, between the form and the back link", () => {
    const page = renderPasswordRecoveryResetFormView();

    expect(page.getAnotherPinLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.ACCESS.RECOVERY
    );
    expect(page.getBackLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.ACCESS.LOGIN
    );
    expect(
      isNodeBefore(page.getSubmit(), page.getNoEmailNote())
    ).toBe(true);
    expect(
      isNodeBefore(
        page.getNoEmailNote(),
        page.getAnotherPinLink()
      )
    ).toBe(true);
    expect(
      isNodeBefore(
        page.getAnotherPinLink(),
        page.getBackLink()
      )
    ).toBe(true);
  });

  it("links the PIN error to the PIN input after a blocked submit", async () => {
    const page = renderPasswordRecoveryResetFormView();

    await page.clickSubmit();

    expect(page.getPinInput()).toHaveAccessibleDescription(
      expect.stringContaining(FIELD_ERROR_MESSAGE)
    );
  });

  it("announces a form failure in one alert directly above the submit", async () => {
    const page = renderPasswordRecoveryResetFormView({
      action: vi.fn().mockResolvedValue(UNKNOWN_ERROR),
    });
    await page.fillValid();

    await page.clickSubmit();

    await waitFor(() =>
      expect(page.queryAlerts()).toHaveLength(SINGLE_ALERT)
    );
    const [alert] = page.queryAlerts();
    expect(isNodeBefore(page.getPinInput(), alert)).toBe(
      true
    );
    expect(isNodeBefore(alert, page.getSubmit())).toBe(
      true
    );
    expect(page.getForm()).toContainElement(alert);
  });
});
