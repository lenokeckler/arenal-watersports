import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  ACCESS_SHARED_COPY,
  PATHS,
  STRING,
} from "@/app/constants";
import { isNodeBefore } from "@/app/utils/dom/tests/isNodeBefore";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import {
  ARIA_DISABLED_ATTRIBUTE,
  NO_ALERTS,
  NO_VALIDATE_PROPERTY,
  SINGLE_ALERT,
  TRUE_VALUE,
} from "./passwordRecoveryView.constants";
import {
  HREF_ATTRIBUTE,
  READONLY_PROPERTY,
  TYPED_USERNAME,
} from "./passwordRecoveryScreen.constants";
import { NETWORK_ERROR } from "./passwordRecoveryRequest.constants";
import { renderPasswordRecoveryRequestFormView } from "./renderPasswordRecoveryRequestFormView";

describe("PasswordRecoveryRequestFormView", () => {
  it("starts with an empty username and no alert", () => {
    const page = renderPasswordRecoveryRequestFormView();

    expect(page.getUsernameInput()).toHaveValue(
      STRING.Empty
    );
    expect(page.queryAlerts()).toHaveLength(NO_ALERTS);
  });

  it("leaves validation to the form logic, not the browser", () => {
    const page = renderPasswordRecoveryRequestFormView();

    expect(page.getForm()).toHaveProperty(
      NO_VALIDATE_PROPERTY,
      true
    );
  });

  it("orders heading, username, submit, no-email note and back link", () => {
    const page = renderPasswordRecoveryRequestFormView();

    expect(
      isNodeBefore(
        page.getHeading(),
        page.getUsernameInput()
      )
    ).toBe(true);
    expect(
      isNodeBefore(
        page.getUsernameInput(),
        page.getSubmit()
      )
    ).toBe(true);
    expect(
      isNodeBefore(page.getSubmit(), page.getNote())
    ).toBe(true);
    expect(
      isNodeBefore(page.getNote(), page.getBackLink())
    ).toBe(true);
  });

  it("sends the worker back to the login", () => {
    const page = renderPasswordRecoveryRequestFormView();

    expect(page.getBackLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.ACCESS.LOGIN
    );
  });

  it("links the field error to the username input after a blocked submit", async () => {
    const action = vi.fn<PasswordRecoveryServerAction>();
    const page = renderPasswordRecoveryRequestFormView({
      action,
    });

    await page.clickSubmit();

    expect(
      page.getUsernameInput()
    ).toHaveAccessibleDescription(
      ACCESS_SHARED_COPY.USERNAME_REQUIRED
    );
    expect(action).not.toHaveBeenCalled();
  });

  it("announces a form failure in one alert above the form and keeps the username", async () => {
    const page = renderPasswordRecoveryRequestFormView({
      action: vi.fn().mockResolvedValue(NETWORK_ERROR),
    });
    await page.typeUsername(TYPED_USERNAME);

    await page.clickSubmit();

    await waitFor(() =>
      expect(page.queryAlerts()).toHaveLength(SINGLE_ALERT)
    );
    expect(
      isNodeBefore(page.queryAlerts()[0], page.getForm())
    ).toBe(true);
    expect(page.getUsernameInput()).toHaveValue(
      TYPED_USERNAME
    );
  });

  it("locks the field and the button while sending", async () => {
    const page = renderPasswordRecoveryRequestFormView({
      action: vi.fn<PasswordRecoveryServerAction>(
        () => new Promise(() => undefined)
      ),
    });
    await page.typeUsername(TYPED_USERNAME);

    await page.clickSubmit();

    await waitFor(() =>
      expect(page.getSubmit()).toHaveTextContent(
        PASSWORD_RECOVERY_REQUEST_COPY.SUBMITTING
      )
    );
    expect(page.getSubmit()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      TRUE_VALUE
    );
    expect(page.getUsernameInput()).toHaveProperty(
      READONLY_PROPERTY,
      true
    );
  });
});
