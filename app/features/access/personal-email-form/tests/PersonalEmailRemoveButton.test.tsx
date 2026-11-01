import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  PERSONAL_EMAIL_INTENT,
  PERSONAL_EMAIL_INTENT_FIELD,
} from "@/app/constants";
import PersonalEmailRemoveButton from "../components/PersonalEmailRemoveButton";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import {
  ARIA_DISABLED_ATTRIBUTE,
  ARIA_HIDDEN_ATTRIBUTE,
  DELETE_ICON_NAME,
  IDLE_REMOVE_BUTTON_PROPS,
  FALSE_VALUE,
  NAME_ATTRIBUTE,
  PROGRESS_ICON_NAME,
  TRUE_VALUE,
  TYPE_ATTRIBUTE,
  VALUE_ATTRIBUTE,
} from "./personalEmailScreen.constants";

const renderButton = (props = IDLE_REMOVE_BUTTON_PROPS) => {
  render(<PersonalEmailRemoveButton {...props} />);
  return screen.getByRole(ARIA_ROLE.BUTTON);
};

describe("PersonalEmailRemoveButton", () => {
  it("submits the remove intent", () => {
    const button = renderButton();

    expect(button).toHaveAttribute(
      TYPE_ATTRIBUTE,
      BUTTON_TYPES.SUBMIT
    );
    expect(button).toHaveAttribute(
      NAME_ATTRIBUTE,
      PERSONAL_EMAIL_INTENT_FIELD
    );
    expect(button).toHaveAttribute(
      VALUE_ATTRIBUTE,
      PERSONAL_EMAIL_INTENT.REMOVE
    );
  });

  it("shows the label and a decorative delete icon", () => {
    const button = renderButton();

    expect(button).toHaveTextContent(
      PERSONAL_EMAIL_FORM_COPY.REMOVE
    );
    expect(
      screen.getByText(DELETE_ICON_NAME)
    ).toHaveAttribute(ARIA_HIDDEN_ATTRIBUTE, TRUE_VALUE);
    expect(button).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      FALSE_VALUE
    );
  });

  it("shows progress when removing is the pending intent", () => {
    const button = renderButton({
      isPending: true,
      pendingIntent: PERSONAL_EMAIL_INTENT.REMOVE,
    });

    expect(button).toHaveTextContent(
      PERSONAL_EMAIL_FORM_COPY.REMOVING
    );
    expect(
      screen.getByText(PROGRESS_ICON_NAME)
    ).toBeInTheDocument();
    expect(button).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      TRUE_VALUE
    );
  });

  it("only looks disabled when saving is the pending intent", () => {
    const button = renderButton({
      isPending: true,
      pendingIntent: PERSONAL_EMAIL_INTENT.SAVE,
    });

    expect(button).toHaveTextContent(
      PERSONAL_EMAIL_FORM_COPY.REMOVE
    );
    expect(button).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      TRUE_VALUE
    );
    expect(
      screen.queryByText(PROGRESS_ICON_NAME)
    ).toBeNull();
  });
});
