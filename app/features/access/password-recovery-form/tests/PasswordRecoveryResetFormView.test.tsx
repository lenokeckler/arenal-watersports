import { describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import {
  AUTOCOMPLETE,
  PATHS,
  STRING,
} from "@/app/constants";
import { isNodeBefore } from "@/app/utils/dom/tests/isNodeBefore";
import {
  AUTOCOMPLETE_ATTRIBUTE,
  FIELD_ERROR_MESSAGE,
  HREF_ATTRIBUTE,
} from "./passwordRecoveryScreen.constants";
import { UNKNOWN_ERROR } from "./passwordRecoveryReset.constants";
import {
  NO_ALERTS,
  NO_VALIDATE_PROPERTY,
  PENDING_RULE_LABEL,
  PRESET_USERNAME,
  RULE_COUNT,
  SINGLE_ALERT,
} from "./passwordRecoveryView.constants";
import { renderPasswordRecoveryResetFormView } from "./renderPasswordRecoveryResetFormView";

describe("PasswordRecoveryResetFormView", () => {
  it("prefills the username and leaves the secrets empty", () => {
    const page = renderPasswordRecoveryResetFormView();

    expect(page.getUsernameInput()).toHaveValue(
      PRESET_USERNAME
    );
    expect(page.getPinInput()).toHaveValue(STRING.Empty);
    expect(page.getNewPasswordInput()).toHaveValue(
      STRING.Empty
    );
    expect(page.getConfirmInput()).toHaveValue(
      STRING.Empty
    );
    expect(page.queryAlerts()).toHaveLength(NO_ALERTS);
  });

  it("shows every password rule as pending before anything is typed", () => {
    const page = renderPasswordRecoveryResetFormView();

    expect(page.getRuleItems()).toHaveLength(RULE_COUNT);
    page.getRuleItems().forEach((item) => {
      expect(item).toHaveTextContent(PENDING_RULE_LABEL);
    });
  });

  it("leaves validation to the form logic, not the browser", () => {
    const page = renderPasswordRecoveryResetFormView();

    expect(page.getForm()).toHaveProperty(
      NO_VALIDATE_PROPERTY,
      true
    );
  });

  it("asks the browser for a new password in both password fields", () => {
    const page = renderPasswordRecoveryResetFormView();

    expect(page.getNewPasswordInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.NEW_PASSWORD
    );
    expect(page.getConfirmInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.NEW_PASSWORD
    );
  });

  it("orders heading, notice, fields and submit", () => {
    const page = renderPasswordRecoveryResetFormView();
    const ordered = [
      page.getHeading(),
      page.getNotice(),
      page.getUsernameInput(),
      page.getPinInput(),
      page.getNewPasswordInput(),
      page.getConfirmInput(),
      page.getSubmit(),
    ];

    ordered.slice(1).forEach((node, index) => {
      expect(isNodeBefore(ordered[index], node)).toBe(true);
    });
  });

  it("puts the another-PIN link, the no-email note and the back link after the form", () => {
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
      isNodeBefore(
        page.getSubmit(),
        page.getAnotherPinLink()
      )
    ).toBe(true);
    expect(
      isNodeBefore(
        page.getAnotherPinLink(),
        page.getNoEmailNote()
      )
    ).toBe(true);
    expect(
      isNodeBefore(
        page.getNoEmailNote(),
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
    expect(
      isNodeBefore(page.getConfirmInput(), alert)
    ).toBe(true);
    expect(isNodeBefore(alert, page.getSubmit())).toBe(
      true
    );
    expect(page.getForm()).toContainElement(alert);
  });
});
