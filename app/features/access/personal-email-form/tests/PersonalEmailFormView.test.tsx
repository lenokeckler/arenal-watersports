import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  AUTOCOMPLETE,
  PATHS,
  PERSONAL_EMAIL_INTENT,
  PERSONAL_EMAIL_INTENT_FIELD,
  STRING,
} from "@/app/constants";
import { PERSONAL_EMAIL_HINT_ID } from "../constants/PersonalEmailFieldIds.constants";
import { isNodeBefore } from "@/app/utils/dom/tests/isNodeBefore";
import {
  AUTOCOMPLETE_ATTRIBUTE,
  DESCRIBED_BY_ATTRIBUTE,
  NAME_ATTRIBUTE,
  REGISTERED_ADDRESS,
  VALUE_ATTRIBUTE,
} from "./personalEmailScreen.constants";
import {
  HREF_ATTRIBUTE,
  NO_ALERTS,
  SINGLE_ALERT,
} from "./personalEmailFormView.constants";
import { SAVE_INPUT } from "./personalEmailForm.constants";
import { NETWORK_ERROR } from "./personalEmailErrors.constants";
import { renderPersonalEmailFormView } from "./renderPersonalEmailFormView";

describe("PersonalEmailFormView", () => {
  it("prefills the email and leaves the password empty", () => {
    const page = renderPersonalEmailFormView();

    expect(page.getEmailInput()).toHaveValue(
      REGISTERED_ADDRESS
    );
    expect(page.getPasswordInput()).toHaveValue(
      STRING.Empty
    );
  });

  it("asks the browser for the current password, not a new one", () => {
    const page = renderPersonalEmailFormView();

    expect(page.getPasswordInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.CURRENT_PASSWORD
    );
  });

  it("links the email input to the transparency hint", () => {
    const page = renderPersonalEmailFormView();

    expect(page.getEmailInput()).toHaveAttribute(
      DESCRIBED_BY_ATTRIBUTE,
      PERSONAL_EMAIL_HINT_ID
    );
  });

  it("puts the save button before the remove button", () => {
    const page = renderPersonalEmailFormView();

    expect(page.getSave()).toHaveAttribute(
      NAME_ATTRIBUTE,
      PERSONAL_EMAIL_INTENT_FIELD
    );
    expect(page.getSave()).toHaveAttribute(
      VALUE_ATTRIBUTE,
      PERSONAL_EMAIL_INTENT.SAVE
    );
    expect(
      isNodeBefore(page.getSave(), page.getRemove())
    ).toBe(true);
  });

  it("puts the remove button before the back link", () => {
    const page = renderPersonalEmailFormView();

    expect(page.getBackLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.PROFILE.ROOT
    );
    expect(
      isNodeBefore(page.getRemove(), page.getBackLink())
    ).toBe(true);
  });

  it("does not render the remove button when removing is not allowed", () => {
    const page = renderPersonalEmailFormView({
      canRemove: false,
    });

    expect(page.queryRemove()).toBeNull();
  });

  it("shows no alert until something fails", () => {
    const page = renderPersonalEmailFormView();

    expect(page.queryAlerts()).toHaveLength(NO_ALERTS);
  });

  it("announces a form-level failure in exactly one alert", async () => {
    const page = renderPersonalEmailFormView({
      action: vi.fn().mockResolvedValue(NETWORK_ERROR),
    });
    await page.fill(SAVE_INPUT);

    await page.clickSave();

    await waitFor(() =>
      expect(page.queryAlerts()).toHaveLength(SINGLE_ALERT)
    );
  });
});
