import { screen } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import "./firstSignInAction.setup";
import { isNodeBefore } from "./isNodeBefore";
import {
  BEFORE_FIELDS_TEXT,
  FOOTER_TEXT,
  FORM_SELECTOR,
  HEADING_TEXT,
} from "./PasswordChangeFormView.slots.constants";
import { renderPasswordChangeFormView } from "./renderPasswordChangeFormView";
import { renderPasswordChangeFormViewWithSlots } from "./renderPasswordChangeFormViewWithSlots";

describe("PasswordChangeFormView slots", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the heading it receives instead of a fixed one", () => {
    renderPasswordChangeFormViewWithSlots();

    expect(
      screen.getByText(HEADING_TEXT)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(FIRST_SIGN_IN_FORM_COPY.HEADING)
    ).not.toBeInTheDocument();
  });

  it("places the before-fields slot inside the form ahead of the first field", () => {
    const page = renderPasswordChangeFormViewWithSlots();

    const slot = screen.getByText(BEFORE_FIELDS_TEXT);

    expect(slot.closest(FORM_SELECTOR)).not.toBeNull();
    expect(isNodeBefore(slot, page.getCurrentInput())).toBe(
      true
    );
  });

  it("places the footer slot inside the form after the submit button", () => {
    renderPasswordChangeFormViewWithSlots();

    const slot = screen.getByText(FOOTER_TEXT);

    expect(slot.closest(FORM_SELECTOR)).not.toBeNull();
    expect(
      isNodeBefore(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: FIRST_SIGN_IN_FORM_COPY.SUBMIT,
        }),
        slot
      )
    ).toBe(true);
  });

  it("renders no extra content when the optional slots are omitted", () => {
    renderPasswordChangeFormView();

    expect(
      screen.queryByText(BEFORE_FIELDS_TEXT)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(FOOTER_TEXT)
    ).not.toBeInTheDocument();
  });
});
