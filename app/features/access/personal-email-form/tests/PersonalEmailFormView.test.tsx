import { describe, expect, it } from "vitest";
import {
  PATHS,
  PERSONAL_EMAIL_INTENT,
  PERSONAL_EMAIL_INTENT_FIELD,
  STRING,
} from "@/app/constants";
import { PERSONAL_EMAIL_HINT_ID } from "../constants/PersonalEmailFieldIds.constants";
import { isPersonalEmailNodeBefore } from "./isPersonalEmailNodeBefore";
import {
  DESCRIBED_BY_ATTRIBUTE,
  NAME_ATTRIBUTE,
  REGISTERED_ADDRESS,
  VALUE_ATTRIBUTE,
} from "./personalEmailScreen.constants";
import { HREF_ATTRIBUTE } from "./personalEmailFormView.constants";
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
      isPersonalEmailNodeBefore(
        page.getSave(),
        page.getRemove()
      )
    ).toBe(true);
  });

  it("puts the remove button before the back link", () => {
    const page = renderPersonalEmailFormView();

    expect(page.getBackLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.PROFILE.ROOT
    );
    expect(
      isPersonalEmailNodeBefore(
        page.getRemove(),
        page.getBackLink()
      )
    ).toBe(true);
  });

  it("does not render the remove button when removing is not allowed", () => {
    const page = renderPersonalEmailFormView({
      canRemove: false,
    });

    expect(page.queryRemove()).toBeNull();
  });
});
