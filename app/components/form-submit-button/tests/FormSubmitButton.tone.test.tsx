import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { FORM_SUBMIT_BUTTON_TONE } from "../constants/FormSubmitButtonTone.constants";
import FormSubmitButton from "../FormSubmitButton";
import type { FormSubmitButtonProps } from "../models/FormSubmitButtonProps.interface";
import {
  DANGER_BORDER_CLASS,
  DANGER_INTERACTIVE_CLASS,
  IDLE_LABEL,
  PENDING_CLASS,
  PENDING_LABEL,
  PRIMARY_FILL_CLASS,
} from "./FormSubmitButton.constants";
import { DEFAULT_PROPS } from "./FormSubmitButton.defaults.constants";
import { createFormSubmitButtonPage } from "./FormSubmitButton.page";

const renderButton = (
  overrides: Partial<FormSubmitButtonProps> = {},
  label = IDLE_LABEL
) => {
  render(
    <FormSubmitButton
      {...DEFAULT_PROPS}
      {...overrides}
    />
  );
  return createFormSubmitButtonPage().getButton(label);
};

describe("FormSubmitButton tone", () => {
  it("is the filled primary button by default", () => {
    const button = renderButton();

    expect(button).toHaveClass(PRIMARY_FILL_CLASS);
    expect(button).not.toHaveClass(DANGER_BORDER_CLASS);
  });

  it("renders the danger outline with its own interaction", () => {
    const button = renderButton({
      tone: FORM_SUBMIT_BUTTON_TONE.DANGER_OUTLINE,
    });

    expect(button).toHaveClass(
      DANGER_BORDER_CLASS,
      DANGER_INTERACTIVE_CLASS
    );
    expect(button).not.toHaveClass(PRIMARY_FILL_CLASS);
  });

  it("dims the danger outline while pending", () => {
    const button = renderButton(
      {
        isPending: true,
        tone: FORM_SUBMIT_BUTTON_TONE.DANGER_OUTLINE,
      },
      PENDING_LABEL
    );

    expect(button).toHaveClass(PENDING_CLASS);
    expect(button).not.toHaveClass(
      DANGER_INTERACTIVE_CLASS
    );
  });
});
