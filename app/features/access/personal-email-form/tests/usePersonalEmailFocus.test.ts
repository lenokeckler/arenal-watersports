import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NO_HANDLED_PERSONAL_EMAIL_FOCUS_TRIGGER } from "../constants/PersonalEmailFocus.constants";
import { usePersonalEmailFocus } from "../hooks/usePersonalEmailFocus";
import { attachPersonalEmailInputs } from "./attachPersonalEmailInputs";
import type { PersonalEmailFocusProps } from "./PersonalEmailFocusProps.interface";
import {
  BOTH_ERRORS,
  FAILED_SUBMIT_TRIGGER,
  NO_ERRORS_PROPS,
  PASSWORD_ONLY_ERRORS,
  SERVER_ERROR_TRIGGER,
} from "./usePersonalEmailFocus.constants";

const renderFocus = (initial: PersonalEmailFocusProps) => {
  const hook = renderHook(
    ({ errors, trigger }: PersonalEmailFocusProps) =>
      usePersonalEmailFocus(errors, trigger),
    { initialProps: initial }
  );
  return {
    ...hook,
    inputs: attachPersonalEmailInputs(hook.result.current),
  };
};

describe("usePersonalEmailFocus", () => {
  it("focuses nothing before any submit", () => {
    const { inputs } = renderFocus({
      errors: BOTH_ERRORS,
      trigger: NO_HANDLED_PERSONAL_EMAIL_FOCUS_TRIGGER,
    });

    expect(document.body).toHaveFocus();
    expect(inputs.email).not.toHaveFocus();
  });

  it("focuses the email first after a failed submit", () => {
    const { inputs, rerender } =
      renderFocus(NO_ERRORS_PROPS);

    rerender({
      errors: BOTH_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    expect(inputs.email).toHaveFocus();
  });

  it("focuses the password when only it is invalid", () => {
    const { inputs, rerender } =
      renderFocus(NO_ERRORS_PROPS);

    rerender({
      errors: PASSWORD_ONLY_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    expect(inputs.currentPassword).toHaveFocus();
  });

  it("focuses the field of a server error when it arrives", () => {
    const { inputs, rerender } =
      renderFocus(NO_ERRORS_PROPS);

    rerender({
      errors: PASSWORD_ONLY_ERRORS,
      trigger: SERVER_ERROR_TRIGGER,
    });

    expect(inputs.currentPassword).toHaveFocus();
  });

  it("does not move the focus while typing after a failed submit", () => {
    const { inputs, rerender } =
      renderFocus(NO_ERRORS_PROPS);
    rerender({
      errors: BOTH_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    rerender({
      errors: PASSWORD_ONLY_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    expect(inputs.email).toHaveFocus();
    expect(inputs.currentPassword).not.toHaveFocus();
  });
});
