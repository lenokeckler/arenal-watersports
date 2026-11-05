import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import type { PersonalEmailServerAction } from "../models/PersonalEmailServerAction.type";
import { SAVE_INPUT } from "./personalEmailForm.constants";
import {
  ARIA_DISABLED_ATTRIBUTE,
  PROGRESS_ICON_NAME,
  READONLY_PROPERTY,
  TRUE_VALUE,
} from "./personalEmailScreen.constants";
import { SINGLE_SPINNER } from "./personalEmailFormView.constants";
import { renderPersonalEmailFormView } from "./renderPersonalEmailFormView";

const neverSettlingAction =
  vi.fn<PersonalEmailServerAction>(
    () => new Promise(() => undefined)
  );

describe("PersonalEmailFormView while sending", () => {
  it("shows progress only on the save button and locks both", async () => {
    const page = renderPersonalEmailFormView({
      action: neverSettlingAction,
    });
    await page.fill(SAVE_INPUT);

    await page.clickSave();

    await waitFor(() =>
      expect(page.getSave()).toHaveTextContent(
        PERSONAL_EMAIL_FORM_COPY.SUBMITTING
      )
    );
    expect(page.getRemove()).toHaveTextContent(
      PERSONAL_EMAIL_FORM_COPY.REMOVE
    );
    expect(page.getSave()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      TRUE_VALUE
    );
    expect(page.getRemove()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      TRUE_VALUE
    );
    expect(page.getEmailInput()).toHaveProperty(
      READONLY_PROPERTY,
      true
    );
    expect(
      screen.getAllByText(PROGRESS_ICON_NAME)
    ).toHaveLength(SINGLE_SPINNER);
  });

  it("shows progress only on the remove button when removing", async () => {
    const page = renderPersonalEmailFormView({
      action: neverSettlingAction,
    });
    await page.fill(SAVE_INPUT);

    await page.clickRemove();

    await waitFor(() =>
      expect(page.getRemove()).toHaveTextContent(
        PERSONAL_EMAIL_FORM_COPY.REMOVING
      )
    );
    expect(page.getSave()).toHaveTextContent(
      PERSONAL_EMAIL_FORM_COPY.SUBMIT
    );
  });
});
